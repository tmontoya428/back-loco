const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importa cors
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Code = require('./models/Code')

const app = express();
app.use(express.json());

// Configura CORS para permitir el origen del front-end
app.use(cors());  // Aquí debes llamar a cors()

mongoose.connect('mongodb+srv://tmontoya:montoya0428@cluster0.2riy6.mongodb.net/ganaComoLoco?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);



app.listen(5000, () => console.log('Server running on port 5000'));

/*const express = require('express');
const mongoose = require('mongoose');
const Code = require('./models/Code'); // Asegúrate de importar tu modelo

const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb+srv://tmontoya:montoya0428@cluster0.2riy6.mongodb.net/ganaComoLoco?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado a MongoDB");
  
  // Eliminar el índice de `qrCode_1`
  Code.collection.dropIndex('qrCode_1', (err, result) => {
    if (err) {
      console.log("No se pudo eliminar el índice 'qrCode_1' o no existe:", err.message);
    } else {
      console.log("Índice 'qrCode_1' eliminado con éxito:", result);
    }
  });

}).catch(err => console.error("Error al conectar a MongoDB:", err))

// Función para generar los códigos ganadores
const generarCodigosGanadores = () => {
  const codigos = [];
  let codigo = 0;

  // Generar 200 códigos con premio de 10,000
  for (let i = 0; i < 200; i++) {
    codigos.push({
      codigo: codigo.toString().padStart(3, '0'),
      premio: 10000,
      estado: 'libre',
      fecha: '',
      hora: ''
    });
    codigo++;
  }

  // Generar 150 códigos con premio de 50,000
  for (let i = 0; i < 150; i++) {
    codigos.push({
      codigo: codigo.toString().padStart(3, '0'),
      premio: 50000,
      estado: 'libre',
      fecha: '',
      hora: ''
    });
    codigo++;
  }

  // Generar 50 códigos con premio de 1,000,000
  for (let i = 0; i < 50; i++) {
    codigos.push({
      codigo: codigo.toString().padStart(3, '0'),
      premio: 1000000,
      estado: 'libre',
      fecha: '',
      hora: ''
    });
    codigo++;
  }

  return codigos;
};

// Generar los códigos automáticamente al arrancar el servidor
const generarYGuardarCodigos = async () => {
  try {
    const codigos = generarCodigosGanadores();
    await Code.insertMany(codigos); // Guardar los códigos en la colección "codes"
    console.log("Códigos ganadores guardados en MongoDB con éxito");
  } catch (error) {
    console.error("Error al guardar los códigos ganadores:", error);
  }
};

// Llamar la función para generar y guardar los códigos al iniciar el servidor
generarYGuardarCodigos();

app.listen(5000, () => {
  console.log('Servidor ejecutándose en http://localhost:5000');
});*/
