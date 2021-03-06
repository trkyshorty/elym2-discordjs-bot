const { Command } = require('../../system');

class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['pause', 'stop', 'dur'],

      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: [],
      moderatorOnly: false,
      ownerOnly: false,
    });
  }

  /**
   * TODO: Update this.client.queue Playing state
   *
   * @param {any} message
   */
  async run(message) {
    const player = this.client.manager.players.get(message.guild.id);
    if (!player) return;
    await player.pause(true);
  }
}

module.exports = PauseCommand;
