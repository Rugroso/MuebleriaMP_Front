import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

interface ReporteCompras {
  fecha: string;
  reportes: {
    distribuidor: string;
    mueble: string;
    cantidad: string;
    costoUnitario: string;
    costoTotal: number;
  }[];
}

interface CreditoReporte {
  fecha: string;
  clientes: {
    nombre: string;
    direccion: string;
    telefono: string;
    adeudo: number;
    mesesRestantes: number;
  }[];
}

interface VentasReporte {
  fecha: string;
  ventas: {
    nombre: string;
    mueble: string;
    cantidad: number;
    costoUnitario: number;
    costoTotal: number;
  }[];
}

interface MueblesReporte {
  fecha: string;
  muebles: {
    nombre: string;
    precio: number;
    descripcion: string;
  }[];
}


export const generarReporteCompras = async (data: ReporteCompras) => {
  try {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { 
              font-family: 'Helvetica'; 
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 150px;
              height: 150px;
              margin-bottom: 20px;
            }
            .title {
              font-size: 24px;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .footer {
              margin-top: 40px;
              font-style: italic;
            }
            .confidential {
              margin-top: 100px;
              text-align: center;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img class="logo" src="https://i.imgur.com/YOUR_LOGO.png" alt="Logo Muebleria" />
            <h1>Muebleria Machu Picchu Don Salinas de Gortari</h1>
            <h2>Reporte de Ventas</h2>
            <h3>Clientes en Crédito a día de ${data.fecha}</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Adeudo</th>
                <th>Meses restantes</th>
              </tr>
            </thead>
            <tbody>
              ${data.reportes.map(cliente => `
                <tr>
                  <td>${cliente.distribuidor}</td>
                  <td>${cliente.mueble}</td>
                  <td>${cliente.cantidad}</td>
                  <td>${cliente.costoUnitario}</td>
                  <td>$${cliente.costoTotal}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <p>Las personas en este documento se encuentran con compras a crédito actualmente.</p>

          <div class="confidential">
            Documento Propiedad de Muebleria Don Salinas de Gortari Machu Picchu. Confidencial.
          </div>
        </body>
      </html>
    `;

    

    // Genera el PDF
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false
    });

    // Comparte el archivo
    await Sharing.shareAsync(uri);
    return true;
  } catch (error) {
    console.error('Error al generar PDF:', error);
    return false;
  }
}; 

export const generarReporteVentas = async (data: VentasReporte) => {
  try {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { 
              font-family: 'Helvetica'; 
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 150px;
              height: 150px;
              margin-bottom: 20px;
            }
            .title {
              font-size: 24px;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .footer {
              margin-top: 40px;
              font-style: italic;
            }
            .confidential {
              margin-top: 100px;
              text-align: center;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img class="logo" src="https://i.imgur.com/YOUR_LOGO.png" alt="Logo Muebleria" />
            <h1>Muebleria Machu Picchu Don Salinas de Gortari</h1>
            <h2>Reporte de Ventas</h2>
            <h3>Ventas en el mes de noviembre a día de ${data.fecha}</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Mueble</th>
                <th>Cantidad</th>
                <th>Costo Unitario</th>
                <th>Costo Total</th>
              </tr>
            </thead>
            <tbody>
              ${data.ventas.map(venta => `
                <tr>
                  <td>${data.ventas.indexOf(venta) + 1}</td>
                  <td>${venta.nombre}</td>
                  <td>${venta.mueble}</td>
                  <td>${venta.cantidad}</td>
                  <td>$${venta.costoUnitario}</td>
                  <td>$${venta.costoTotal}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <p>Las personas en este documento compraron en Muebleria Machu Picchu Don Salinas de Gortari en el mes de noviembre.</p>

          <div class="confidential">
            Documento Propiedad de Muebleria Don Salinas de Gortari Machu Picchu. Confidencial.
          </div>
        </body>
      </html>
    `;

    // Genera el PDF y lo comparte
    const { uri } = await Print.printToFileAsync({ html, base64: false });
    await Sharing.shareAsync(uri);
    return true;
  } catch (error) {
    console.error('Error al generar PDF:', error);
    return false;
  }
};

export const generarReporteMuebles = async (data: MueblesReporte) => {
  try {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body {
              font-family: 'Helvetica';
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 150px;
              height: 150px;
              margin-bottom: 20px;
            }
            .title {
              font-size: 24px;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .footer {
              margin-top: 40px;
              font-style: italic;
            }
            .confidential {
              margin-top: 100px;
              text-align: center;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img class="logo" src="https://i.imgur.com/YOUR_LOGO.png" alt="Logo Muebleria" />
            <h1>Muebleria Machu Picchu Don Salinas de Gortari</h1>
            <h2>Reporte de Inventario</h2>
            <h3>Muebles sin stock en Establecimiento Tijuana a día de ${data.fecha}</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              ${data.muebles.map(mueble => `
                <tr>
                  <td>${data.muebles.indexOf(mueble) + 1}</td>
                  <td>${mueble.nombre}</td>
                  <td>$${mueble.precio}</td>
                  <td>${mueble.descripcion}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <p>Los muebles en este documento no se encuentran disponibles en el inventario seleccionado.</p>

          <div class="confidential">
            Documento Propiedad de Muebleria Don Salinas de Gortari Machu Picchu. Confidencial.
          </div>
        </body>
      </html>
    `;

    // Genera el PDF y lo comparte
    const { uri } = await Print.printToFileAsync({ html, base64: false });
    await Sharing.shareAsync(uri);
    return true;
  } catch (error) {
    console.error('Error al generar PDF:', error);
    return false;
  }
};


export const generarReporteCredito = async (data: CreditoReporte) => {
  try {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body {
              font-family: 'Helvetica';
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 150px;
              height: 150px;
              margin-bottom: 20px;
            }
            .title {
              font-size: 24px;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .footer {
              margin-top: 40px;
              font-style: italic;
            }
            .confidential {
              margin-top: 100px;
              text-align: center;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img class="logo" src="https://i.imgur.com/YOUR_LOGO.png" alt="Logo Muebleria" />
            <h1>Muebleria Machu Picchu Don Salinas de Gortari</h1>
            <h2>Reporte de Crédito</h2>
            <h3>Clientes en Crédito a día de ${data.fecha}</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Adeudo</th>
                <th>Meses restantes</th>
              </tr>
            </thead>
            <tbody>
              ${data.clientes.map((cliente, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${cliente.nombre}</td>
                  <td>${cliente.direccion}</td>
                  <td>${cliente.telefono}</td>
                  <td>$${cliente.adeudo}</td>
                  <td>${cliente.mesesRestantes}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <p>Las personas en este documento se encuentran con compras a crédito actualmente.</p>

          <div class="confidential">
            Documento Propiedad de Muebleria Don Salinas de Gortari Machu Picchu. Confidencial.
          </div>
        </body>
      </html>
    `;

    // Genera el PDF y lo comparte
    const { uri } = await Print.printToFileAsync({ html, base64: false });
    await Sharing.shareAsync(uri);
    return true;
  } catch (error) {
    console.error('Error al generar PDF:', error);
    return false;
  }
};