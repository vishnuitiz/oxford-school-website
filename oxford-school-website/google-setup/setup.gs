/**
 * Google side of the school website (version 2).
 *
 * ALREADY RAN VERSION 1? Paste this over the old script, press Save, pick "upgradeAll" in the toolbar
 * and press Run. It keeps your existing forms, sheet and links. Run it once (running it again is safe).
 *
 * STARTING FROM NOTHING? Pick "setupAll" instead. Run it ONCE only: running it twice creates a second set.
 *
 * What the news sheet looks like after this:
 *   Columns from the form (Timestamp, Title, Category, Date, Name, Article), then four columns this script
 *   adds: Approved (Yes/No), Topic (pick from a list), Photos (links, optional), Slug (filled automatically).
 *   Rows that nobody has approved yet are highlighted so they are easy to spot.
 *
 * OPTIONAL photo uploads from the form: in the news form add a "File upload" question titled
 * "Photo upload". A script cannot create that question type. Then run upgradeAll again.
 * Google then makes every respondent sign in with a Google account. Uploaded photos stay private until approved.
 */

const SCHOOL = 'Oxford International School';
const STAGES = [
  'Pre-Nursery to UKG (ages 3 to 6)',
  'Primary, Grades 1 to 5 (ages 6 to 11)',
  'Middle school, Grades 6 to 8 (ages 11 to 14)',
  'Secondary, Grades 9 and 10 (ages 14 to 16)',
  'Not sure yet',
];
// Same list and wording as `topics` in src/lib/news.ts. Each topic also feeds its Activities page and the Gallery.
const TOPICS = [
  'Sports', 'Clubs', 'Arts and culture', 'Celebrations', 'Trips',
  'Community service', 'Achievements', 'In the classroom', 'School life',
];
const ALERT_EMAIL = ''; // leave empty to use the account running this script
const PHOTO_FOLDER = SCHOOL + ' website photos';
const UPLOAD_TITLE = 'Photo upload';
const UPLOAD_RE = /^photo(\s*\/\s*video)?\s+upload/i; // matches the form question's column heading

// ---------------------------------------------------------------- first-time setup

function setupAll() {
  const enquiry = createEnquiry_();
  const news = createNews_();
  PropertiesService.getScriptProperties().setProperty('NEWS_SHEET_ID', news.ss.getId());
  prepareNewsSheet_(news.ss);
  installTriggers_(enquiry.form, news.form, news.ss);
  rememberAlertAddress_();
  const folder = photoFolder_();

  Logger.log('DONE. Copy these:');
  logLinks_(enquiry.form, news.form, enquiry.ss, news.ss, folder);
  Logger.log('Still to do by hand: in the news sheet choose File > Share > Publish to web, pick the "Published" tab, format CSV, Publish, and copy that link (NEWS_CSV_URL).');
}

function createEnquiry_() {
  const form = FormApp.create(SCHOOL + ': admissions enquiry');
  form.setDescription('Tell us a little about your child. A member of our admissions team will reply within two working days.');
  form.setConfirmationMessage('Thank you. We will be in touch within two working days.');
  form.addTextItem().setTitle('Your name').setRequired(true);
  form.addTextItem().setTitle('Email').setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());
  form.addTextItem().setTitle('Phone (optional)');
  form.addListItem().setTitle('Your child’s stage').setChoiceValues(STAGES).setRequired(true);
  form.addDateItem().setTitle('Preferred visit date (optional, weekdays only)');
  form.addMultipleChoiceItem().setTitle('Preferred visit time (optional)')
    .setChoiceValues(['Morning (9:30 am)', 'Afternoon (2:00 pm)']);
  form.addParagraphTextItem().setTitle('How can we help?');
  const ss = SpreadsheetApp.create(SCHOOL + ': enquiries (private)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return { form: form, ss: ss };
}

function createNews_() {
  const form = FormApp.create(SCHOOL + ': share a news article');
  form.setDescription('Write about something happening at school. Our team reads every article before it appears on the website. Please do not include children’s full names or photographs unless a parent has agreed.');
  form.setConfirmationMessage('Thank you. Your article will appear on the website once our team has approved it.');
  form.addTextItem().setTitle('Title').setRequired(true);
  form.addMultipleChoiceItem().setTitle('Category').setChoiceValues(['News', 'Event']).setRequired(true);
  form.addDateItem().setTitle('Date (the day of the event, or today for news)').setRequired(true);
  form.addTextItem().setTitle('Your name and role (for example: Ms Rao, parent of a Grade 5 student)').setRequired(true);
  form.addParagraphTextItem().setTitle('Article').setRequired(true);
  const ss = SpreadsheetApp.create(SCHOOL + ': news (admin approves here)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return { form: form, ss: ss };
}

// ---------------------------------------------------------------- upgrade from version 1

function upgradeAll() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('NEWS_SHEET_ID');
  if (!id) throw new Error('NEWS_SHEET_ID is missing. Was setupAll (version 1) run in this project?');
  const ss = SpreadsheetApp.openById(id);

  if (refreshNewsForm_(FormApp.openByUrl(ss.getFormUrl()))) Utilities.sleep(5000);
  prepareNewsSheet_(ss);
  ensureTrigger_('fillSlugs', function (b) { return b.forSpreadsheet(ss).onFormSubmit(); });
  ensureTrigger_('onSheetEdit', function (b) { return b.forSpreadsheet(ss).onEdit(); });
  rememberAlertAddress_();
  const folder = photoFolder_();
  const enquiryForms = updateEnquiryStages_();
  fillSlugs();
  shareRecentPhotos_();

  Logger.log('UPGRADED. Nothing was deleted and your old links still work.');
  const enquiry = pickEnquiryForm_(enquiryForms);
  if (enquiry) {
    props.setProperty('ENQUIRY_FORM_ID', enquiry.getId());
    logLinks_(enquiry, FormApp.openByUrl(ss.getFormUrl()), SpreadsheetApp.openById(enquiry.getDestinationId()), ss, folder);
  } else {
    Logger.log('No enquiry form with a response sheet was found, so the link list is skipped.');
  }
  Logger.log('Enquiry forms updated with the new stage list: ' + enquiryForms.length);
  Logger.log('Triggers installed: ' + ScriptApp.getProjectTriggers().map(function (t) {
    return t.getHandlerFunction() + ' (' + t.getEventType() + ')';
  }).join(', '));
}

// Replaces the stage choices on the live enquiry form, found by name in Drive.
function updateEnquiryStages_() {
  const done = [];
  const files = DriveApp.getFilesByName(SCHOOL + ': admissions enquiry');
  while (files.hasNext()) {
    const f = files.next();
    if (f.isTrashed() || f.getMimeType() !== 'application/vnd.google-apps.form') continue;
    const form = FormApp.openById(f.getId());
    const item = form.getItems(FormApp.ItemType.LIST).filter(function (i) { return /stage/i.test(i.getTitle()); })[0];
    if (!item) continue;
    item.asListItem().setChoiceValues(STAGES);
    form.setDescription('Tell us a little about your child. A member of our admissions team will reply within two working days.');
    done.push(form);
  }
  if (!done.length) Logger.log('Could not find the enquiry form by name. Edit its "Your child’s stage" question by hand: ' + STAGES.join(' / '));
  return done;
}

// Drive can hold several forms with the same name (for example from an earlier setup run). The real one is the
// remembered one, otherwise the one that has a response sheet and the most responses.
function pickEnquiryForm_(forms) {
  const saved = PropertiesService.getScriptProperties().getProperty('ENQUIRY_FORM_ID');
  let best = null;
  let bestScore = -1;
  forms.forEach(function (f) {
    let dest = '';
    try { dest = f.getDestinationId(); } catch (err) { /* no response sheet */ }
    if (!dest) return;
    const score = f.getId() === saved ? 1e9 : f.getResponses().length;
    if (score > bestScore) { best = f; bestScore = score; }
  });
  if (forms.length > 1) Logger.log('Note: Drive holds ' + forms.length + ' enquiry forms with this name. Links below are for the one with the most responses; the others may be unused copies.');
  return best;
}

// Keeps the live news form's wording current and reports whether the optional photo upload question is there.
// Returns true if it changed a title (the sheet heading then updates a few seconds later).
function refreshNewsForm_(form) {
  let changed = false;
  form.getItems().forEach(function (item) {
    const title = item.getTitle().trim();
    if (/^your name and role/i.test(title) && /year 5/i.test(title)) {
      item.setTitle('Your name and role (for example: Ms Rao, parent of a Grade 5 student)');
      changed = true;
    }
  });
  const uploads = form.getItems(FormApp.ItemType.FILE_UPLOAD);
  if (!uploads.length) {
    Logger.log('Photo upload question: NOT added yet. To add it, open this link (admin only) > Add question > File upload: ' + form.getEditUrl());
  } else {
    if (uploads[0].getTitle() !== UPLOAD_TITLE) {
      uploads[0].setTitle(UPLOAD_TITLE);
      changed = true;
    }
    Logger.log('Photo upload question: found and connected.');
  }
  return changed;
}

// ---------------------------------------------------------------- links

// Google's own shortener gives forms.gle links. Nothing is sent to any third-party shortener.
function shortForm_(form) {
  const long = form.getPublishedUrl();
  try { return form.shortenFormUrl(long); } catch (err) { return long; }
}

// Sheets and Drive folders have no Google shortener, so these are the shortest working links.
function sheetLink_(ss) { return 'https://docs.google.com/spreadsheets/d/' + ss.getId(); }

function logLinks_(enquiryForm, newsForm, enquirySs, newsSs, folder) {
  Logger.log('1. Enquiry form (public; website env NEXT_PUBLIC_ENQUIRY_FORM_URL): ' + shortForm_(enquiryForm));
  Logger.log('2. News form (public; share with staff, students and parents): ' + shortForm_(newsForm));
  Logger.log('3. News sheet (private; admin approves here): ' + sheetLink_(newsSs));
  Logger.log('4. Enquiries sheet (private; never publish): ' + sheetLink_(enquirySs));
  Logger.log('5. Photo folder (anyone with the link can view; upload photos here): ' + folder.getUrl());
}

// ---------------------------------------------------------------- the news sheet

function responsesSheet_(ss) {
  const s = ss.getSheets().filter(function (x) { return /^form responses/i.test(x.getName()); })[0];
  if (!s) throw new Error('Could not find the "Form responses" tab in the news sheet.');
  return s;
}

function headers_(sh) {
  return sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0].map(function (x) { return String(x).trim(); });
}

function col_(headers, re) {
  for (let i = 0; i < headers.length; i++) if (re.test(headers[i])) return i + 1;
  return 0;
}

function letter_(n) {
  let s = '';
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

function slugify_(text) {
  return String(text).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 60).replace(/-+$/, '');
}

// Adds the admin columns if missing, then wires up dropdowns, notes, highlighting and the Published tab.
function prepareNewsSheet_(ss) {
  let sh = null;
  for (let i = 0; i < 8 && !sh; i++) {
    SpreadsheetApp.flush();
    sh = SpreadsheetApp.openById(ss.getId()).getSheets().filter(function (x) { return /^form responses/i.test(x.getName()); })[0] || null;
    if (!sh) Utilities.sleep(1500);
  }
  if (!sh) throw new Error('The responses tab was not created yet. Wait a minute and run again.');

  const notes = {
    Approved: 'Choose Yes to publish this row on the website. No or empty keeps it off. To take an article down, set No and use the menu: Oxford site > Publish approved articles now.',
    Topic: 'Pick where this article belongs. It also appears on that Activities page and in the Gallery. Empty means "School life".',
    Photos: 'Optional. Upload photos to the school photo folder, copy each photo link, and paste them here, one per line. Add a caption after a | sign.',
    Slug: 'Filled in automatically: this is the article’s web address. Please do not change it after the article is published.',
  };
  let h = headers_(sh);
  ['Approved', 'Topic', 'Photos', 'Slug'].forEach(function (name) {
    if (!col_(h, new RegExp('^' + name + '$', 'i'))) {
      sh.getRange(1, sh.getLastColumn() + 1).setValue(name);
      h = headers_(sh);
    }
    sh.getRange(1, col_(h, new RegExp('^' + name + '$', 'i'))).setFontWeight('bold').setNote(notes[name]);
  });

  const approved = col_(h, /^approved$/i);
  const topic = col_(h, /^topic$/i);
  sh.getRange(2, approved, 1999, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['Yes', 'No'], true).setAllowInvalid(false).build());
  sh.getRange(2, topic, 1999, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(TOPICS, true).setAllowInvalid(false).build());
  sh.setFrozenRows(1);

  const pending = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($A2<>"",$' + letter_(approved) + '2="")')
    .setBackground('#fff3cd')
    .setRanges([sh.getRange(2, 1, 1999, h.length)])
    .build();
  sh.setConditionalFormatRules([pending]);

  const pub = ss.getSheetByName('Published') || ss.insertSheet('Published');
  pub.clear();
  pub.getRange('A1').setFormula(publishedFormula_(sh));
  pub.getRange('A1:H1').setFontWeight('bold');
  const first = ss.getSheetByName('Sheet1');
  if (first && ss.getSheets().length > 1) ss.deleteSheet(first);
}

// The columns are found by their heading, so reordering or adding form questions later does not break it.
function publishedFormula_(sh) {
  const h = headers_(sh);
  const r = "'" + sh.getName() + "'!";
  const ref = function (re, label) {
    const c = col_(h, re);
    if (!c) throw new Error('The news sheet has no "' + label + '" column.');
    return r + letter_(c) + '2:' + letter_(c);
  };
  const head = '"date","category","topic","title","author","text","photos","slug"';
  // TEXT() turns each date into plain yyyy-mm-dd text, so the CSV never shows a serial number.
  const data = '{ARRAYFORMULA(TEXT(' + ref(/^date/i, 'Date') + ',"yyyy-mm-dd")),' +
    ref(/^category/i, 'Category') + ',' + ref(/^topic$/i, 'Topic') + ',' + ref(/^title$/i, 'Title') + ',' +
    ref(/^your name/i, 'Your name and role') + ',' + ref(/^article$/i, 'Article') + ',' +
    photosExpr_(h, ref) + ',' + ref(/^slug$/i, 'Slug') + ',' + ref(/^approved$/i, 'Approved') + '}';
  return '=IFERROR({' + head + '; QUERY(' + data +
    ', "select Col1, Col2, Col3, Col4, Col5, Col6, Col7, Col8 where Col9 = \'Yes\'", 0)}, {' + head + '})';
}

// Photos can come from the optional "Photo upload" form question and from the Photos column; both are joined, one per line.
function photosExpr_(h, ref) {
  const manual = ref(/^photos$/i, 'Photos');
  if (!col_(h, UPLOAD_RE)) return manual;
  const up = ref(UPLOAD_RE, 'Photo upload');
  return 'ARRAYFORMULA(' + up + '&IF((' + up + '<>"")*(' + manual + '<>""),CHAR(10),"")&' + manual + ')';
}

// Photos uploaded through the form are private to the form owner. Once an article is approved, its photos are made
// viewable by link so the website build can download them. Unapproved uploads stay private.
function photoIds_(text) {
  const ids = [];
  String(text || '').replace(/(?:[?&]id=|\/d\/)([\w-]{10,})/g, function (m, id) { ids.push(id); return m; });
  return ids;
}

function sharePhotosForRows_(sh, firstRow, lastRow) {
  const h = headers_(sh);
  const approved = col_(h, /^approved$/i);
  const cols = [col_(h, /^photos$/i), col_(h, UPLOAD_RE)].filter(function (c) { return c > 0; });
  if (!approved || !cols.length || lastRow < firstRow) return;
  const n = lastRow - firstRow + 1;
  const ok = sh.getRange(firstRow, approved, n, 1).getValues();
  const cells = cols.map(function (c) { return sh.getRange(firstRow, c, n, 1).getValues(); });
  for (let i = 0; i < n; i++) {
    if (String(ok[i][0]).trim() !== 'Yes') continue;
    cells.forEach(function (col) {
      photoIds_(col[i][0]).forEach(function (id) {
        try { DriveApp.getFileById(id).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); }
        catch (err) { Logger.log('Could not share photo ' + id + ': ' + err.message); }
      });
    });
  }
}

// Runs when a cell is edited: approving an article (or changing its photos) opens up that row's photos.
function onSheetEdit(e) {
  const sh = e.range.getSheet();
  if (!/^form responses/i.test(sh.getName()) || e.range.getRow() < 2) return;
  sharePhotosForRows_(sh, e.range.getRow(), e.range.getRow() + e.range.getNumRows() - 1);
}

// Safety net before a rebuild: re-checks the 100 most recent rows.
function shareRecentPhotos_() {
  const id = PropertiesService.getScriptProperties().getProperty('NEWS_SHEET_ID');
  const sh = responsesSheet_(SpreadsheetApp.openById(id));
  const last = sh.getLastRow();
  sharePhotosForRows_(sh, Math.max(2, last - 99), last);
}

// Gives every article a permanent web address the first time it is seen, so editing a title later never breaks links.
function fillSlugs() {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const id = PropertiesService.getScriptProperties().getProperty('NEWS_SHEET_ID');
    const sh = responsesSheet_(SpreadsheetApp.openById(id));
    const h = headers_(sh);
    const titleCol = col_(h, /^title$/i);
    const slugCol = col_(h, /^slug$/i);
    const last = sh.getLastRow();
    if (!titleCol || !slugCol || last < 2) return;
    const titles = sh.getRange(2, titleCol, last - 1, 1).getValues();
    const slugs = sh.getRange(2, slugCol, last - 1, 1).getValues();
    const used = {};
    slugs.forEach(function (row) { if (row[0]) used[row[0]] = true; });
    let changed = false;
    for (let i = 0; i < slugs.length; i++) {
      if (slugs[i][0] || !titles[i][0]) continue;
      const base = slugify_(titles[i][0]) || 'article';
      let s = base;
      for (let n = 2; used[s]; n++) s = base + '-' + n;
      used[s] = true;
      slugs[i][0] = s;
      changed = true;
    }
    if (changed) sh.getRange(2, slugCol, slugs.length, 1).setValues(slugs);
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------- photos folder

function photoFolder_() {
  const props = PropertiesService.getScriptProperties();
  const saved = props.getProperty('PHOTO_FOLDER_ID');
  if (saved) {
    try { return DriveApp.getFolderById(saved); } catch (err) { /* folder was deleted: make a new one */ }
  }
  const folder = DriveApp.createFolder(PHOTO_FOLDER);
  // Photos here end up on the public website, so anyone with the link may view them.
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  props.setProperty('PHOTO_FOLDER_ID', folder.getId());
  return folder;
}

// ---------------------------------------------------------------- triggers and alerts

function installTriggers_(enquiryForm, newsForm, newsSs) {
  ScriptApp.newTrigger('addMenu_').forSpreadsheet(newsSs).onOpen().create();
  ScriptApp.newTrigger('dailyRebuild').timeBased().everyDays(1).atHour(5).create();
  ScriptApp.newTrigger('notifySubmission').forForm(enquiryForm).onFormSubmit().create();
  ScriptApp.newTrigger('notifySubmission').forForm(newsForm).onFormSubmit().create();
  ScriptApp.newTrigger('fillSlugs').forSpreadsheet(newsSs).onFormSubmit().create();
  ScriptApp.newTrigger('onSheetEdit').forSpreadsheet(newsSs).onEdit().create();
}

function ensureTrigger_(handler, build) {
  const exists = ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === handler; });
  if (!exists) build(ScriptApp.newTrigger(handler)).create();
}

function rememberAlertAddress_() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('ALERT_TO')) return;
  const me = Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail();
  if (me) props.setProperty('ALERT_TO', me);
}

function notifySubmission(e) {
  const props = PropertiesService.getScriptProperties();
  const to = ALERT_EMAIL || props.getProperty('ALERT_TO') || Session.getEffectiveUser().getEmail();
  if (!to) throw new Error('No address for alert emails. Run upgradeAll once.');
  const lines = e.response.getItemResponses().map(function (r) {
    return r.getItem().getTitle() + ': ' + r.getResponse();
  });
  MailApp.sendEmail(to, 'New response: ' + e.source.getTitle(), lines.join('\n\n'));
}

// ---------------------------------------------------------------- menu in the news sheet

function addMenu_() {
  SpreadsheetApp.getUi().createMenu('Oxford site')
    .addItem('Publish approved articles now', 'publishNow')
    .addItem('Set rebuild link...', 'setRebuildLink')
    .addToUi();
}

function setRebuildLink() {
  const ui = SpreadsheetApp.getUi();
  const r = ui.prompt('Rebuild link', 'Paste the deploy hook URL from your website host (it starts with https://).', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  const url = r.getResponseText().trim();
  if (url.indexOf('https://') !== 0) { ui.alert('That does not look like a web link. Nothing was saved.'); return; }
  PropertiesService.getScriptProperties().setProperty('REBUILD_URL', url);
  ui.alert('Saved. "Publish approved articles now" will use it, and the site also rebuilds every morning.');
}

function publishNow() {
  const ui = SpreadsheetApp.getUi();
  fillSlugs();
  shareRecentPhotos_();
  ui.alert(triggerRebuild_()
    ? 'Rebuild started. The website updates in about two minutes.'
    : 'No working rebuild link yet. Use the menu: Oxford site > Set rebuild link.');
}

function dailyRebuild() { fillSlugs(); shareRecentPhotos_(); triggerRebuild_(); }

function triggerRebuild_() {
  const url = PropertiesService.getScriptProperties().getProperty('REBUILD_URL');
  if (!url) return false;
  const res = UrlFetchApp.fetch(url, { method: 'post', muteHttpExceptions: true });
  return res.getResponseCode() < 300;
}
