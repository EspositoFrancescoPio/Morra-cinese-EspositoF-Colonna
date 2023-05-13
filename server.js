const TelegramBot = require('node-telegram-bot-api');

// Creiamo un nuovo bot con il token fornito da BotFather
const bot = new TelegramBot('6158725101:AAE93hJ7LVMQUtax5JRRKsk5iqN4Ps1eDgU', { polling: true });

// Tabella per tenere traccia delle vittorie, sconfitte e pareggi
const punteggio = {
  utente: 0,
  bot: 0,
  pareggi: 0
};

// Definiamo la funzione per gestire il comando /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Ciao! Giochiamo a Morra Cinese? Scrivi /morra per iniziare.');
});

// Definiamo la funzione per gestire il comando /morra
bot.onText(/\/morra/, (msg) => {
  const options = ['sasso', 'carta', 'forbice'];
  const botChoice = options[Math.floor(Math.random() * options.length)];
  const userChoice = msg.text.split(' ')[1];

  if (options.includes(userChoice)) {
    if (userChoice === botChoice) {
      punteggio.pareggi++;
      bot.sendMessage(msg.chat.id, `Hai scelto ${userChoice}, anch'io ho scelto ${botChoice}. È un pareggio!`);
    } else if ((userChoice === 'sasso' && botChoice === 'forbice') || (userChoice === 'carta' && botChoice === 'sasso') || (userChoice === 'forbice' && botChoice === 'carta')) {
      punteggio.user++;
      bot.sendMessage(msg.chat.id, `Hai scelto ${userChoice}, io ho scelto ${botChoice}. Hai vinto!`);
    } else {
      punteggio.bot++;
      bot.sendMessage(msg.chat.id, `Hai scelto ${userChoice}, io ho scelto ${botChoice}. Ho vinto io!`);
    }
    bot.sendMessage(msg.chat.id, `Vittorie: ${punteggio.utente}\nSconfitte: ${punteggio.bot}\nPareggi: ${punteggio.pareggi}`);
  } else {
    bot.sendMessage(msg.chat.id, 'Scelta non valida. Scrivi /morra seguito da sasso, carta o forbice.');
  }
});
// Avviamo il bot
bot.on('polling_error', (error) => console.log(error));
