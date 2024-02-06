console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './img/sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//plano de fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)
        
        contexto.drawImage(
            sprites, //img
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sprite X, sprit Y
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do recorte da sprite
            planoDeFundo.x, planoDeFundo.y, //onde qr na img dentro do canvas
            planoDeFundo.largura, planoDeFundo.altura, //tamanho da sprite dentro do canvas
        );
        contexto.drawImage(
            sprites, //img
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sprite X, sprit Y
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do recorte da sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, //onde qr na img dentro do canvas
            planoDeFundo.largura, planoDeFundo.altura, //tamanho da sprite dentro do canvas
        );
    },
};

//chao
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites, //img
            chao.spriteX, chao.spriteY, //sprite X, sprit Y
            chao.largura, chao.altura, //tamanho do recorte da sprite
            chao.x, chao.y, //onde qr na img dentro do canvas
            chao.largura, chao.altura, //tamanho da sprite dentro do canvas
        );
        contexto.drawImage(
            sprites, //img
            chao.spriteX, chao.spriteY, //sprite X, sprit Y
            chao.largura, chao.altura, //tamanho do recorte da sprite
            (chao.x + chao.largura), chao.y, //onde qr na img dentro do canvas
            chao.largura, chao.altura, //tamanho da sprite dentro do canvas
        );
    },
};

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
        contexto.drawImage(
            sprites, //img
            flappyBird.spriteX, flappyBird.spriteY, //sprite X, sprit Y
            flappyBird.largura, flappyBird.altura, //tamanho do recorte da sprite
            flappyBird.x, flappyBird.y, //onde qr na img dentro do canvas
            flappyBird.largura, flappyBird.altura, //tamanho da sprite dentro do canvas
        );
    },
};

function loop() {
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.atualiza();
    flappyBird.desenha();
    
    requestAnimationFrame(loop);
}

loop();