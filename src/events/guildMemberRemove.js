const { MessageEmbed } = require('discord.js');
const { Event } = require('../system');

class GuildMemberRemoveEvent extends Event {
  run(member) {
    const { models } = this.client.database;
    models.Guild.findOne({ guild_id: member.guild.id }).then((guildDoc) => {
      const moderationPlugin = guildDoc.plugins.moderation;

      if (moderationPlugin && moderationPlugin.enable) {
        const moderationLogChannel = this.client.channels.cache.get(moderationPlugin.log_channel);

        const memberRemoveLog = new MessageEmbed()
          .setColor('#FF0000')
          .setAuthor(`${member.user.username}`, `${member.user.displayAvatarURL({ format: 'png', size: 2048 })}`)
          .setThumbnail(`${member.user.displayAvatarURL({ format: 'png', size: 2048 })}`)
          .setDescription(`${member.user} az önce sunucudan ayrıldı`)
          .setTimestamp();

        moderationLogChannel.send(memberRemoveLog).catch((err) => this.logger.warn(err));
      }
    });
  }
}

module.exports = GuildMemberRemoveEvent;
