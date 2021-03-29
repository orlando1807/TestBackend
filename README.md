# TestBackendHabits

# Ejecución primer ejercicio
# Instalar Nodejs
- Abrir consola en la ruta actual del archivo Ejercicio1.js
- Ejecutar node Ejercicio1.js



# Ejecución segundo ejercicio y tercer ejercicio
# Instalar Nodejs y ejecutar npm install para instalar todas las dependencias requeridas
- Abrir consola en la ruta actual de la carpeta backendHabits
- Ejecutar npm run dev

Rutas:
 - http://localhost:3000/api/login  (Método GET, se generará un token con user:test y password:test el cual se retornara ese token)
 - http://localhost:3000/api/medicines      (Método POST, se envía petición para crear un medicamento de la farmacia)
   Ejemplo: 
            {
              "name":"Amoxicilina",
              "type":"Antibióticos",
              "quantity": 10,
              "price":"2.5",
              "location":"Local 1, pasillo 3"
            }
   De esta manera se enviara POST y estara en un arreglo interno.
 - http://localhost:3000/api/medicines      (Método GET, enviando esta petición sera para traer todos los medicamentos en la farmacia)
 - http://localhost:3000/api/medicines/:id  (Método GET /:id, enviando esta petición sera para traer un medicamento en específico en la farmacia)
 - http://localhost:3000/api/medicines      (Método PUT, enviando esta petición sera para actualizar un medicamento en específico en la farmacia)
 - http://localhost:3000/api/medicines      (Método DELETE, enviando esta petición sera para eliminar un medicamento en específico en la farmacia)

# Nota: Se utilizó un arreglo de objetos para almacenar todos los medicamentos, evitando problemas de versiones.
