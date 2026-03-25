// ============================================================
// COLE ESTE CÓDIGO NO GOOGLE APPS SCRIPT
// Acesse: https://script.google.com/home
// Crie novo projeto > cole este código > clique em Implantar
// ============================================================

const SPREADSHEET_ID = '1qMsJERkUrE2PiZkZMSnA4olHsceZHoSm3zhc0kSFqeE';
const NOTIFICATION_EMAIL = 'contato@mov.marketing';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();

    // Cria cabeçalhos se a planilha estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data/Hora', 'Nome', 'Email', 'WhatsApp', 'Mensagem']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    sheet.appendRow([
      timestamp,
      data.name    || '',
      data.email   || '',
      data.phone   || '',
      data.message || ''
    ]);

    // Envia email de notificação
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: `🚀 Novo lead via site MOV — ${data.name}`,
      htmlBody: `
        <h2>Novo contato recebido pelo site</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px">
          <tr style="background:#f4f4f4">
            <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Nome</td>
            <td style="padding:8px;border:1px solid #ddd">${data.name}</td>
          </tr>
          <tr>
            <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Email</td>
            <td style="padding:8px;border:1px solid #ddd"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr style="background:#f4f4f4">
            <td style="padding:8px;font-weight:bold;border:1px solid #ddd">WhatsApp</td>
            <td style="padding:8px;border:1px solid #ddd">${data.phone || '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Mensagem</td>
            <td style="padding:8px;border:1px solid #ddd">${data.message || '—'}</td>
          </tr>
          <tr style="background:#f4f4f4">
            <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Recebido em</td>
            <td style="padding:8px;border:1px solid #ddd">${timestamp}</td>
          </tr>
        </table>
        <br>
        <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}" style="background:#6366f1;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block">
          Ver planilha completa
        </a>
      `
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Recebe dados do formulário via GET (mais confiável pelo browser)
function doGet(e) {
  if (e && e.parameter && e.parameter.email) {
    try {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();

      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Data/Hora', 'Nome', 'Email', 'WhatsApp', 'Segmento', 'Serviços', 'Investimento']);
        sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
      }

      const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

      sheet.appendRow([
        timestamp,
        e.parameter.name     || '',
        e.parameter.email    || '',
        e.parameter.phone    || '',
        e.parameter.segment  || '',
        e.parameter.services || '',
        e.parameter.budget   || ''
      ]);

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: `🚀 Novo lead via site MOV — ${e.parameter.name}`,
        htmlBody: `
          <h2>Novo lead recebido pelo site</h2>
          <table style="border-collapse:collapse;width:100%;max-width:560px">
            <tr style="background:#f4f4f4">
              <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Nome</td>
              <td style="padding:8px;border:1px solid #ddd">${e.parameter.name}</td>
            </tr>
            <tr>
              <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Email</td>
              <td style="padding:8px;border:1px solid #ddd"><a href="mailto:${e.parameter.email}">${e.parameter.email}</a></td>
            </tr>
            <tr style="background:#f4f4f4">
              <td style="padding:8px;font-weight:bold;border:1px solid #ddd">WhatsApp</td>
              <td style="padding:8px;border:1px solid #ddd"><a href="https://wa.me/55${(e.parameter.phone||'').replace(/\D/g,'')}">${e.parameter.phone || '—'}</a></td>
            </tr>
            <tr>
              <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Segmento</td>
              <td style="padding:8px;border:1px solid #ddd">${e.parameter.segment || '—'}</td>
            </tr>
            <tr style="background:#f4f4f4">
              <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Serviços</td>
              <td style="padding:8px;border:1px solid #ddd">${e.parameter.services || '—'}</td>
            </tr>
            <tr>
              <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Investimento</td>
              <td style="padding:8px;border:1px solid #ddd">${e.parameter.budget || '—'}</td>
            </tr>
            <tr style="background:#f4f4f4">
              <td style="padding:8px;font-weight:bold;border:1px solid #ddd">Recebido em</td>
              <td style="padding:8px;border:1px solid #ddd">${timestamp}</td>
            </tr>
          </table>
          <br>
          <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}" style="background:#6366f1;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block">
            Ver planilha completa
          </a>
        `
      });

      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: err.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'MOV Script Online' }))
    .setMimeType(ContentService.MimeType.JSON);
}
