console.log('Flappy Bird');
console.log('Desenvolvido Por: Guilherme César');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

//criando nova imagem
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d'); //definindo que o jogo sera 2d

//[plano de fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    //atura total - 204; 
    y: canvas.height - 204,
    desenha() {
        //pintando o fundo
        contexto.fillStyle = '#70c5ce';
        //preenchendo a tela toda
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,  
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y, 
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,  
            planoDeFundo.largura, planoDeFundo.altura,
            //deslocando a segunda imagem mais para a direita
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, 
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

//[chao]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    //atura total - 204; 
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,  
            chao.largura, chao.altura,
            chao.x, chao.y, 
            chao.largura, chao.altura, 
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,  
            chao.largura, chao.altura,
            //deslocando a segunda imagem mais para a direita
            (chao.x + chao.largura), chao.y, 
            chao.largura, chao.altura,
        );
    },
};

//[fazendo a colisao]
function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){
        return true;
    }

    return false;
}

function criaFlappyBird(){
    // [flappyBird]
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura:24,
        x: 10,
        y: 50,
        pulo: 4.6,
        gravidade: 0.25,
        velocidade: 0,
        pula(){
            flappyBird.velocidade = - flappyBird.pulo; //quando pular a vlocidade volta para -4.6 
        },
        atualiza() {
            if(fazColisao(flappyBird, chao)){
                console.log('Fez colisão');
                som_HIT.play();

                setTimeout(() => {
                mudaParaTela(Telas.INICIO);

                }, 500);
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade; //velocidade que ele cai
            flappyBird.y =  flappyBird.y + flappyBird.velocidade; //para o flappyBird cair 
        },
        desenha() {
            //pegando uma parte da imagem sprintes.
            contexto.drawImage(
                sprites, 
                flappyBird.spriteX, flappyBird.spriteY, // Sprite(imagem(sprintes.png)) 
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y, //Aonde ele ficar na tela
                flappyBird.largura, flappyBird.altura, 
            );
        },
    };

    return flappyBird;
}


// [Mensagem de inicio]
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
            mensagemGetReady.w, mensagemGetReady.h
        );
    }
}

//
//[Telas]
//
const globais = {}
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    //inicia as variaveis da tela especifica
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}

const Telas = {    
    INICIO: {
        inicializa(){
            globais.flappyBird = criaFlappyBird();
        },
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){

        }
    }
};

//inserindo tela do jogo no objeto de Telas
Telas.JOGO = {
    desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.flappyBird.atualiza();
    }
}

//fazendo um loop, para carregar a imagem
function loop(){   
   telaAtiva.desenha();
   telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

//verificando se existe algum click na tela
window.addEventListener('click', function(){
    if(telaAtiva.click){ 
        telaAtiva.click(); //chama a funçap de click da tela atual
    }
});

mudaParaTela(Telas.INICIO);
//executando a função.
loop();