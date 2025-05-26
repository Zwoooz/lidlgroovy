import { Client, Events, } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    // non-null assertion used as this runs after the 'ready' event and will never be null
    console.log(`${client.user!.username} logged in \n Ready`)
  }
}
