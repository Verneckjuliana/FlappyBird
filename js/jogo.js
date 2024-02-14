console.log('Flappy Bird');

const som_HIT = new Audio();
som_HIT = './efeitos/hit.wav';

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
function criaChao() { 
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            console.log('[chao.x]', chao.x);
            console.log('[repeteEm]', repeteEm);
            console.log('[movimentacao]', movimentacao % repeteEm);

            chao.x = chao.x - movimentoDoChao;
        },
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
}

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY) {
        return true;
    } 

    return false;
}

function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            console.log('devo pular');
            console.log('[antes]', flappyBird.velocidade);
            flappyBird.velocidade = - flappyBird.pulo;
            console.log('[depois]', flappyBird.velocidade);
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if(fazColisao(flappyBird, globais.chao)) {
                console.log('Fez colisao');
                som_HIT.play();
                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);
                }, 500);
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, }, //asa p cima
            { spriteX: 0, spriteY: 26, }, //asa no meio
            { spriteX: 0, spriteY: 52, }, //asa p baixo
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {

        },
        desenha() {
            const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage(
                sprites, //img
                spriteX, spriteY, //sprite X, sprit Y
                flappyBird.largura, flappyBird.altura, //tamanho do recorte da sprite
                flappyBird.x, flappyBird.y, //onde qr na img dentro do canvas
                flappyBird.largura, flappyBird.altura, //tamanho da sprite dentro do canvas
            );
        },
    };
    return flappyBird;
}

//mensagem inicio
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
      contexto.drawImage(
        sprites,
        mensagemGetReady.sX, mensagemGetReady.sY,
        mensagemGetReady.w, mensagemGetReady.h,
        mensagemGetReady.x, mensagemGetReady.y,
        mensagemGetReady.w, mensagemGetReady.h,
      );
    }
}

//telas
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){
            globais.chao.atualiza();
        }
    }
};

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
    },
};


function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();