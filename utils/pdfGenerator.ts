import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface ReporteCompras {
  fechaInicio: string;
  fechaFin: string;
  sucursal: string;
}

export const generarReporteCompras = async (data: ReporteCompras) => {
  try {
    const html = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica'; padding: 20px; }
            h1 { color: #333; text-align: center; }
            .header { margin-bottom: 30px; }
            .info { margin-bottom: 20px; }
            .info p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Reporte de Compras Mensuales</h1>
          </div>
          <div class="info">
            <p><strong>Sucursal:</strong> ${data.sucursal}</p>
            <p><strong>Período:</strong> ${data.fechaInicio} - ${data.fechaFin}</p>
          </div>
          <!-- Aquí puedes agregar más contenido dinámico -->
        </body>
      </html>
    `;

    const options = {
      html,
      fileName: `Reporte_Compras_${data.sucursal}`,
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);
    
    if (file.filePath) {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(file.filePath);
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al generar PDF:', error);
    return false;
  }
}; 