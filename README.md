# Development

Pasos para levantar la app de desarrollo

1. Clonar el repositorio devtalles-codequest-sorteos de el repositorio https://github.com/juan-ma526/devtalles-codequest-sorteos
2. Seguir las instrucciones del repositorio para levantar el frontend localmente.
3. Crear una copia de el .env.template y renombrarlo a .env
4. Reemplazar las variables de entorno
5. Seguir instrucciones del repositorio devtalles-codequest-sorteos para obtener las variables de ClientID, ClientSecret y token.
6. Reemplazar "https://devtalles-codequest-sorteos-gamma.vercel.app/user-notfound" por "http://localhost:3000/user-notfound" en la carpeta auth, dentro de controller.
7. Reemplazar "https://devtalles-codequest-sorteos-gamma.vercel.app/error" por "http://localhost:3000/error" en la carpeta auth, dentro de controller.
8. Reemplazar "https://devtalles-codequest-sorteos-gamma.vercel.app/success" por "http://localhost:3000/success" en la carpeta auth, dentro de controller.
9. Ejecutar el comando `npm install` para reconstruir los modulos de node
10. Ejecutar estos comandos de Prisma

# Prisma Commands

```
npx prisma generate
```

11. Ejecutar el comando `npm run dev` para ejecutar la aplicacion en desarrollo

## Nota: Usuario por defecto

**usuario** admin@gmail.com
**password** 1234

## Nota: Si solo quieres probar la App ya esta hecho el deploy solo usar el usuario para el login, o registrar uno nuevo y probarla

https://devtalles-codequest-sorteos-gamma.vercel.app/
