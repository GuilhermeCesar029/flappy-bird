console.log('Flappy Bird');

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

// [flappyBird]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura:24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
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

//fazendo um loop, para carregar a imagem
function loop(){   
    flappyBird.atualiza(); 
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();


    requestAnimationFrame(loop);
}

//executando a função.
loop();