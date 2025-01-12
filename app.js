
import app from './index.js'
const PORT = 3000;

const main = ()=>{
    app.listen(PORT, ()=>console.log("Servidor iniciado en HTTP://LOCALHOST:3000"));
};

main();