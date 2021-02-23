console.log('Flappy Bird');
console.log('Desenvolvido Por: Guilherme César');

let frames = 0;
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
function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        //atura total - 204; 
        y: canvas.height - 112,
        atualiza(){//movendo o chao
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm; 
        },
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

    return chao;
}

//[fazendo a colisao]
function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){
        return true;
    }

    return false;
}

// [flappyBird]
function criaFlappyBird(){    
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
            if(fazColisao(flappyBird, globais.chao)){
                som_HIT.play();
                
                mudaParaTela(Telas.GAME_OVER);
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade; //velocidade que ele cai
            flappyBird.y =  flappyBird.y + flappyBird.velocidade; //para o flappyBird cair 
        },
        movimentos: [
            {spriteX: 0, spriteY: 0},  //asa pra cima
            {spriteX: 0, spriteY: 26}, //asa no meio
            {spriteX: 0, spriteY: 52}, //asa pra baixo
            {spriteX: 0, spriteY: 26}, //asa no meio
        ],
        frameAtual: 0,
        atualizaOFrameAtual(){
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            
            if(passouOIntervalo){
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha() {
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual]; //desestruturando objeto
            
            //pegando uma parte da imagem sprintes.            
            contexto.drawImage(
                sprites, 
                spriteX, spriteY, // Sprite(imagem(sprintes.png)) 
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

// [Mensagem de GameOver]
const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY,
            mensagemGameOver.w, mensagemGameOver.h,
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h
        );
        
    }
}

//[Canos]
function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            //exibindo varios canos
            canos.pares.forEach(function(par){
                const yRadom = par.y;
                const espacamentoEntreCanos = 90;

                //[cano do céu]
                const canoCeuX = par.x;
                const canoCeuY = yRadom;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                //[cano do Chao]
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRadom;            
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })            
        },


        
        temColisaoComOFlappyBird(par){
            const cabecaDoFlappy = globais.flappyBird.y; 
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            //verifica se teve colisao no cano de cima e no de baixo
            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
                if(cabecaDoFlappy <= par.canoCeu.y || peDoFlappy >= par.canoChao.y){
                    return true;
                }
            }

            return false;
        },
        pares: [],
        atualiza(){
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){
                canos.pares.push({ 
                    x: canvas.width, //começa exibindo os canos no fim da tela 
                    y: -150 * (Math.random() + 1), //gera valores aleatorios
                })
            }

            //exibindos os canos separados, 2pixels para frente
            canos.pares.forEach(function(par){
                par.x -= 2;

                //verificando se o flappyBird tem colisao com o cano
                if(canos.temColisaoComOFlappyBird(par)){
                    som_HIT.play();
                    
                    mudaParaTela(Telas.GAME_OVER);
                    return;
                }

                //excluindo os canos da memoria. shift() exlui o primeiro elemento do array
                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }
            });

        }
    }
    return canos;
}

//[Placar]
function criaPlacar(){
    const placar = {
        pontuacao: 0,
        pontuacaoAtual: 0,
        desenha(){
            contexto.font = '35px "VT323';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
        },
        atualiza(){
            const intervaloDeFrames = 20;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo){
                placar.pontuacao += 1;
            }
            placar.pontuacaoAtual = placar.pontuacao;
        }, 
        desenhaPontuacao(){
            contexto.font = '35px "VT323';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, (canvas.width / 2) + 80, 150);
        }, 
        desenhaPontuacaoBest(){
                contexto.font = '35px "VT323';
                contexto.textAlign = 'right';
                contexto.fillStyle = 'white';
                contexto.fillText(`${placar.pontuacao}`, (canvas.width / 2) + 80, 190);
        } 
    }

    return placar;
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
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha(){
            planoDeFundo.desenha();            
            globais.flappyBird.desenha();            
            globais.chao.desenha();
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

//inserindo tela do jogo no objeto de Telas
Telas.JOGO = {
    inicializa() {
        globais.placar = criaPlacar();
    },
    desenha(){
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
}

//[Game over]
Telas.GAME_OVER = {
    desenha(){
        mensagemGameOver.desenha();
        globais.placar.desenhaPontuacao();
        globais.placar.desenhaPontuacaoBest();
    },
    atualiza(){

    },
    click(){
        mudaParaTela(Telas.INICIO);
    }
}

//fazendo um loop, para carregar a imagem
function loop(){   
   telaAtiva.desenha();
   telaAtiva.atualiza();

   frames += 1;
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