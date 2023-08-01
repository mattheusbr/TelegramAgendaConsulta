const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const { mapearTextoParaConsultas } = require('./utility.js');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
var processarDado = false;

bot.command('gerarCalendario', (ctx) => {
    processarDado = true;
    ctx.reply('Por favor, envie os dados do calendário.');
});

bot.on(message('text'), async (ctx) => {    
    if(processarDado){
        try {
            processarDado = false;
            await ctx.reply('Gerando arquivo...');
            var consultas = mapearTextoParaConsultas(ctx.message.text);
        } catch (e){
            await ctx.reply('Erro ao gerar arquivo.');
        }        
    }else{
        await ctx.reply(`Olá ${ctx.from.first_name}`);
    }    
});

bot.launch();
console.log('Bot iniciado');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));