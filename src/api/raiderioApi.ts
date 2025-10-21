/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** List of details for each active affix */
export type AffixDetails = Model6[];

/** List of affixes applied to this run */
export type Affixes = Model2[];

export interface All {
  color: string;
  score: number;
}

/** Rank across all roles from player's class */
export interface Class {
  /**
   * Realm rank
   * @example 20
   */
  realm: number;
  /**
   * Region rank
   * @example 564
   */
  region: number;
  /**
   * World rank
   * @example 799
   */
  world: number;
}

/** Rank across DPS from player's class */
export interface ClassDps {
  /**
   * Realm rank
   * @example 20
   */
  realm: number;
  /**
   * Region rank
   * @example 564
   */
  region: number;
  /**
   * World rank
   * @example 799
   */
  world: number;
}

/** Rank across healers from player's class */
export interface ClassHealer {
  /**
   * Realm rank
   * @example 20
   */
  realm: number;
  /**
   * Region rank
   * @example 564
   */
  region: number;
  /**
   * World rank
   * @example 799
   */
  world: number;
}

/** Rank across tanks from player's class */
export interface ClassTank {
  /**
   * Realm rank
   * @example 20
   */
  realm: number;
  /**
   * Region rank
   * @example 564
   */
  region: number;
  /**
   * World rank
   * @example 799
   */
  world: number;
}

export interface Dps {
  color: string;
  score: number;
}

/** Rank across DPS from any classes */
export interface Dps1 {
  /**
   * Realm rank
   * @example 20
   */
  realm: number;
  /**
   * Region rank
   * @example 564
   */
  region: number;
  /**
   * World rank
   * @example 799
   */
  world: number;
}

/**
 * Character's faction
 * @example "horde"
 */
export enum Faction {
  Horde = "horde",
  Alliance = "alliance",
}

/**
 * Guild's faction
 * @example "horde"
 */
export enum Faction1 {
  Horde = "horde",
  Alliance = "alliance",
}

/**
 * Faction for this guild
 * @example "horde"
 */
export enum Faction2 {
  Horde = "horde",
  Alliance = "alliance",
}

export interface Gear {
  /** Character's artifact traits on equipped artifact weapon */
  artifact_traits: number;
  /** Character's equipped item level */
  item_level_equipped: number;
  /** Character's total item level (in bags) */
  item_level_total: number;
}

export interface GetApiV1CharactersProfileParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /**
   * Comma separated list of fields to retrieve for this character.
   *
   * General fields:
   * -  <b>gear</b>: retrieve high level item information for player
   * -  <b>talents</b>: retrieve talent and loadout information for player
   * -  <b>talents:categorized</b>: retrieve talent and loadout information for player, separated into class and spec talents
   * -  <b>guild</b>: retrieve basic information about guild the player is in
   * -  <b>covenant</b>: retrieve the covenant and renown level of the player
   *
   * Raiding fields:
   * -  <b>raid_progression</b>: retrieve raid progression data for character. Defaults to Current Expansion. Can add one or more parameters to request specific raids. e.g.: raid_progression:9 would return all of Dragonflight, or raid_progression:nerubar-palace would return just Nerubar Palace. You can also specify :current-expansion, :previous-expansion, :current-tier, or :previous-tier. See the raiding/static-data endpoint for slugs, and expansion ids.
   *
   * Mythic Plus fields:
   * -  <b>mythic_plus_scores_by_season</b>: retrieve scores by mythic plus season. You can specify one or more season by appending multiple ':<season-slug>' values to this field. You can also use the alias 'current' and 'previous' instead of a season name to request that relative season. For example: mythic_plus_scores_by_season:current will request the current season using mythic_plus_scores_by_season:season-tww-1:season-df-4 will return both seasons. Not specifying a season will default to the current season. Note: Results are returned in an array that matches the order of the seasons in the request.
   * -  <b>mythic_plus_ranks</b>: retrieve current season mythic plus rankings for player.
   * -  <b>mythic_plus_recent_runs</b>: retrieve ten most recent mythic plus runs for player (current season only).
   * -  <b>mythic_plus_best_runs</b>: retrieve ten most high scoring mythic plus runs for player (current season only). Specify the paramater :all to retrieve all of a character's best runs for the season.
   * -  <b>mythic_plus_alternate_runs</b>: retrieve ten most high scoring mythic plus alternate runs for player (current season only). Specify the paramater :all to retrieve all of a character's alternate runs for the season. This is available starting Shadowlands Season 1 Post.
   * -  <b>mythic_plus_highest_level_runs</b>: retrieve the player's ten highest Mythic+ runs by Mythic+ level (current season only)
   * -  <b>mythic_plus_weekly_highest_level_runs</b>: retrieve the player's ten highest Mythic+ runs by Mythic+ level for the current raid week (current season only)
   * -  <b>mythic_plus_previous_weekly_highest_level_runs</b>: retrieve the player's ten highest Mythic+ runs by Mythic+ level for the previous raid week (current season only)
   * -  <b>previous_mythic_plus_ranks</b>: retrieve mythic plus rankings for player.
   *
   * Other fields:
   * -  <b>raid_achievement_meta</b>: retrieve raid achievement meta status for a player. This request requires that you specify parameters for the specific tiers you're looking for. For example if you add ':tier21' to the field you will get the status of Tier 21's meta. Multiple tiers can be added to a single request: ':tier21:tier20:tier19'.
   * -  <b>raid_achievement_curve</b>: retrieve AOTC/Cutting Edge achievement status for a given raid slug (or multiple). Multiple slugs can be specified by separating them by colons.
   * @default ""
   */
  fields?: string;
  /**
   * Name of the character to look up. This is not case sensitive.
   * @pattern ^[^\!\@\#\$\%\^\&\*\(\)\?\>\<\;\:]+$
   */
  name: string;
  /** Name of realm that character is on. This can be in slug or title format, e.g. "Altar of Storms" or "altar-of-storms" */
  realm: string;
  /** Name of region to look up character in. Can be one of: us, eu, kr, tw */
  region: "us" | "eu" | "tw" | "kr" | "cn";
}

export interface GetApiV1GuildsBosskillParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /**
   * Boss slug to look up
   * @pattern ^[\w-]+$
   */
  boss: string;
  /** Raid difficulty to look up */
  difficulty: "mythic" | "heroic" | "normal";
  /**
   * Name of the guild to look up. This is not case sensitive.
   * @pattern ^[^\!\@\#\$\%\^\&\*\?\>\<\;\:]+$
   */
  guild: string;
  /** Raid slug to look up */
  raid:
  | "manaforge-omega"
  | "liberation-of-undermine"
  | "nerubar-palace"
  | "blackrock-depths"
  | "awakened-amirdrassil-the-dreams-hope"
  | "awakened-aberrus-the-shadowed-crucible"
  | "awakened-vault-of-the-incarnates"
  | "amirdrassil-the-dreams-hope"
  | "aberrus-the-shadowed-crucible"
  | "vault-of-the-incarnates"
  | "fated-sepulcher-of-the-first-ones"
  | "fated-sanctum-of-domination"
  | "fated-castle-nathria"
  | "sepulcher-of-the-first-ones"
  | "sanctum-of-domination"
  | "castle-nathria"
  | "nyalotha-the-waking-city"
  | "the-eternal-palace"
  | "crucible-of-storms"
  | "battle-of-dazaralor"
  | "uldir"
  | "antorus-the-burning-throne"
  | "tomb-of-sargeras"
  | "the-nighthold"
  | "trial-of-valor"
  | "the-emerald-nightmare";
  /** Name of realm that guild is on. This can be in slug or title format, e.g. "Altar of Storms" or "altar-of-storms" */
  realm: string;
  /** Name of region to look up guild in. Can be one of: us, eu, kr, tw */
  region: "us" | "eu" | "tw" | "kr" | "cn";
}

export interface GetApiV1GuildsProfileParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /**
   * Comma separated list of fields to retrieve for this guild.
   *
   * Supported values:
   * -  <b>raid_progression</b>: retrieve raid progression data for guild. This can optionally take parameters to control
   *    what raids you are getting data for. These parameters can be numeric expansion IDs, specific raid slugs, or the
   *    terms "current-expansion", "previous-expansion", "current-tier", or "previous-tier".
   * -  <b>raid_rankings</b>: retrieve raid rankings data for guild. This can optionally take parameters to control
   *    what raids you are getting data for. These parameters can be numeric expansion IDs, specific raid slugs, or the
   *    terms "current-expansion", "previous-expansion", "current-tier", or "previous-tier".
   * -  <b>raid_encounters:RAID_SLUG:DIFFICULTY</b>: retrieve details on which encounters were defeated from a specific raid and difficulty
   * -  <b>members</b>: retrieve guild members details
   * @default ""
   */
  fields?: string;
  /**
   * Name of the guild to look up. This is not case sensitive.
   * @pattern ^[^\!\@\#\$\%\^\&\*\?\>\<\;\:]+$
   */
  name: string;
  /** Name of realm that guild is on. This can be in slug or title format, e.g. "Altar of Storms" or "altar-of-storms" */
  realm: string;
  /** Name of region to look up guild in. Can be one of: us, eu, kr, tw */
  region: "us" | "eu" | "tw" | "kr" | "cn";
}

export interface GetApiV1MythicplusAffixesParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /**
   * Language to return name and description of affixes in. Can be one of: en, ru, ko, cn, pt, it, fr, es, de, tw
   * @default "en"
   */
  locale?: "en" | "ru" | "ko" | "cn" | "pt" | "it" | "fr" | "es" | "de" | "tw";
  /** Name of region to look up affixes for. Can be one of: us, eu, kr, tw */
  region: "us" | "eu" | "tw" | "kr" | "cn";
}

export interface GetApiV1MythicplusLeaderboardcapacityParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  realm?: string;
  /** Name of region to retrieve runs for. Can be one of: world, us, eu, kr, tw */
  region: "us" | "eu" | "tw" | "kr" | "cn";
  /**
   * Retrieve the capacity info for the current or previous week. Supported values: <b>current</b> and <b>previous</b>.
   * @default "current"
   */
  scope?: "current" | "previous";
}

export interface GetApiV1MythicplusRundetailsParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /** ID of the run that you want to get details for */
  id: number;
  /** Name of the season to retrieve (season-tww-3, etc.). Defaults to current season. */
  season: string;
}

export interface GetApiV1MythicplusRunsParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /** Name of the affixes to restrict the results to. This will support affix in slug form: "bolstering-explosive-tyrannical". Additionally, you can supply just "tyrannical" or "fortified" to get the results for any affix combo with that as the final affix. Use the special keyword "current" to return the result for the current week's affixes, or "all" to retrieve results for all affixes. */
  affixes?: string;
  /**
   * Name of dungeon to filter by. This can be the dungeon's full name "Eye of Azshara" or its slug "eye-of-azshara". Use special keyword "all" to get the stats across all dungeons.
   * @default "all"
   */
  dungeon?: string;
  /**
   * Page of results to return. Limited to 100 pages by default, can be increased with access key to 1000.
   * @min 0
   * @max 1000
   * @default 0
   */
  page?: number;
  /**
   * Name of region to retrieve runs for. Can be one of: world, us, eu, kr, tw
   * @default "world"
   */
  region?: "us" | "eu" | "tw" | "kr" | "cn" | "world";
  /**
   * Name of season to request data for
   * @default "season-tww-3"
   */
  season?: string;
}

export interface GetApiV1MythicplusScoretiersParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /** Name of the season to retrieve (season-tww-3, etc.). Defaults to current season. */
  season?: string;
}

export interface GetApiV1MythicplusSeasoncutoffsParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /** Region to receive cutoffs for */
  region: "us" | "eu" | "tw" | "kr" | "cn";
  /** Season to retrieve cutoffs for */
  season?: string;
}

export interface GetApiV1MythicplusStaticdataParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /** Expansion ID to get slugs for. 10 = The War Within, 9 = Dragonflight, 8 = Shadowlands, 7 = Battle for Azeroth, 6 = Legion */
  expansion_id: number;
}

export interface GetApiV1PeriodsParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
}

export interface GetApiV1RaidingBossrankingsParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /**
   * Slug of boss to look up
   * @pattern ^[\w-]+$
   */
  boss: string;
  /** One of: mythic, heroic, normal */
  difficulty: "mythic" | "heroic" | "normal";
  /** Raid to look up. This can be the raid's full name ("Manaforge Omega") or its name in slug form: "manaforge-omega" */
  raid:
  | "manaforge-omega"
  | "liberation-of-undermine"
  | "nerubar-palace"
  | "blackrock-depths"
  | "awakened-amirdrassil-the-dreams-hope"
  | "awakened-aberrus-the-shadowed-crucible"
  | "awakened-vault-of-the-incarnates"
  | "amirdrassil-the-dreams-hope"
  | "aberrus-the-shadowed-crucible"
  | "vault-of-the-incarnates"
  | "fated-sepulcher-of-the-first-ones"
  | "fated-sanctum-of-domination"
  | "fated-castle-nathria"
  | "sepulcher-of-the-first-ones"
  | "sanctum-of-domination"
  | "castle-nathria"
  | "nyalotha-the-waking-city"
  | "the-eternal-palace"
  | "crucible-of-storms"
  | "battle-of-dazaralor"
  | "uldir"
  | "antorus-the-burning-throne"
  | "tomb-of-sargeras"
  | "the-nighthold"
  | "trial-of-valor"
  | "the-emerald-nightmare";
  /** Name of realm to restrict to. Prefix with `connected-` to retrieve rankings from the connected realm. Requires that region be a standard region: us, eu, kr, tw. */
  realm?: string;
  /** Name of region to restrict progress to. Can be a primary region: world, us, eu, kr, tw. Or a subregion: english, french, german, italian, oceanic, russian, spanish, eu-english, eu-portuguese, eu-spanish, us-english, brazil, us-spanish, us-central, us-eastern, us-mountain, us-pacific */
  region: string;
}

export interface GetApiV1RaidingHalloffameParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  difficulty: "mythic" | "heroic" | "normal";
  /**
   * Raid to look up. This can be the raid's full name ("Manaforge Omega
   *                 ") or its name in slug form: "manaforge-omega"
   */
  raid:
  | "manaforge-omega"
  | "liberation-of-undermine"
  | "nerubar-palace"
  | "blackrock-depths"
  | "awakened-amirdrassil-the-dreams-hope"
  | "awakened-aberrus-the-shadowed-crucible"
  | "awakened-vault-of-the-incarnates"
  | "amirdrassil-the-dreams-hope"
  | "aberrus-the-shadowed-crucible"
  | "vault-of-the-incarnates"
  | "fated-sepulcher-of-the-first-ones"
  | "fated-sanctum-of-domination"
  | "fated-castle-nathria"
  | "sepulcher-of-the-first-ones"
  | "sanctum-of-domination"
  | "castle-nathria"
  | "nyalotha-the-waking-city"
  | "the-eternal-palace"
  | "crucible-of-storms"
  | "battle-of-dazaralor"
  | "uldir"
  | "antorus-the-burning-throne"
  | "tomb-of-sargeras"
  | "the-nighthold"
  | "trial-of-valor"
  | "the-emerald-nightmare";
  /** Name of region to restrict progress to. Can be one of: world, us, eu, kr, tw */
  region: "us" | "eu" | "tw" | "kr" | "cn";
}

export interface GetApiV1RaidingProgressionParams {
  difficulty: "mythic" | "heroic" | "normal";
  /** Raid to look up. This can be the raid's full name ("Manaforge Omega") or its name in slug form: "manaforge-omega" */
  raid:
  | "manaforge-omega"
  | "liberation-of-undermine"
  | "nerubar-palace"
  | "blackrock-depths"
  | "awakened-amirdrassil-the-dreams-hope"
  | "awakened-aberrus-the-shadowed-crucible"
  | "awakened-vault-of-the-incarnates"
  | "amirdrassil-the-dreams-hope"
  | "aberrus-the-shadowed-crucible"
  | "vault-of-the-incarnates"
  | "fated-sepulcher-of-the-first-ones"
  | "fated-sanctum-of-domination"
  | "fated-castle-nathria"
  | "sepulcher-of-the-first-ones"
  | "sanctum-of-domination"
  | "castle-nathria"
  | "nyalotha-the-waking-city"
  | "the-eternal-palace"
  | "crucible-of-storms"
  | "battle-of-dazaralor"
  | "uldir"
  | "antorus-the-burning-throne"
  | "tomb-of-sargeras"
  | "the-nighthold"
  | "trial-of-valor"
  | "the-emerald-nightmare";
  /** Name of region to restrict progress to. Can be one of: world, us, eu, kr, tw */
  region: "us" | "eu" | "tw" | "kr" | "cn";
}

export interface GetApiV1RaidingRaidrankingsParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /** One of: mythic, heroic, normal */
  difficulty: "mythic" | "heroic" | "normal";
  /** Guild IDs of guilds to restrict the results to. Allows filtering to up to 10 different guilds. */
  guilds?: string;
  /**
   * @min 1
   * @max 200
   * @default 50
   */
  limit?: number;
  /**
   * @min 0
   * @default 0
   */
  page?: number;
  /** Raid to look up. This can be the raid's full name ("Manaforge Omega") or its name in slug form: "manaforge-omega" */
  raid:
  | "manaforge-omega"
  | "liberation-of-undermine"
  | "nerubar-palace"
  | "blackrock-depths"
  | "awakened-amirdrassil-the-dreams-hope"
  | "awakened-aberrus-the-shadowed-crucible"
  | "awakened-vault-of-the-incarnates"
  | "amirdrassil-the-dreams-hope"
  | "aberrus-the-shadowed-crucible"
  | "vault-of-the-incarnates"
  | "fated-sepulcher-of-the-first-ones"
  | "fated-sanctum-of-domination"
  | "fated-castle-nathria"
  | "sepulcher-of-the-first-ones"
  | "sanctum-of-domination"
  | "castle-nathria"
  | "nyalotha-the-waking-city"
  | "the-eternal-palace"
  | "crucible-of-storms"
  | "battle-of-dazaralor"
  | "uldir"
  | "antorus-the-burning-throne"
  | "tomb-of-sargeras"
  | "the-nighthold"
  | "trial-of-valor"
  | "the-emerald-nightmare";
  /** Name of realm to restrict to. Prefix with `connected-` to retrieve rankings from the connected realm. Requires that region be a standard region: us, eu, kr, tw. */
  realm?: string;
  /** Name of region to restrict progress to. Can be a primary region: world, us, eu, kr, tw. Or a subregion: english, french, german, italian, oceanic, russian, spanish, eu-english, eu-portuguese, eu-spanish, us-english, brazil, us-spanish, us-central, us-eastern, us-mountain, us-pacific */
  region: string;
}

export interface GetApiV1RaidingStaticdataParams {
  /**
   * The API key from your RaiderIO App: http://raider.io/settings/apps. Apps with API keys have higher rate limits.
   * @default ""
   */
  access_key?: string;
  /** Expansion ID to get slugs for. 10 = The War Within, 9 = Dragonflight, 8 = Shadowlands, 7 = Battle for Azeroth, 6 = Legion */
  expansion_id: number;
}

export interface Guild {
  /** Display name for the guild */
  displayName?: string;
  /** Faction for this guild */
  faction: Faction2;
  /**
   * Internal Raider.IO ID number for this guild
   * @example 955
   */
  id: number;
  /**
   * Name of the guild
   * @example "Ludicrous Speed"
   */
  name: string;
  realm?: Realm;
  region?: Region3;
}

export type Guilds = Model8[];

export interface Healer {
  color: string;
  score: number;
}

/** Rank across healers from any classes */
export interface Healer1 {
  /**
   * Realm rank
   * @example 20
   */
  realm: number;
  /**
   * Region rank
   * @example 564
   */
  region: number;
  /**
   * World rank
   * @example 799
   */
  world: number;
}

export interface ManaforgeOmega {
  /**
   * Expansion ID for this raid
   * @example 8
   */
  expansion_id: number;
  /**
   * Number of heroic mode bosses killed
   * @min 0
   * @example 4
   */
  heroic_bosses_killed: number;
  /**
   * Number of mythic mode bosses killed
   * @min 0
   */
  mythic_bosses_killed: number;
  /**
   * Number of normal mode bosses killed
   * @min 0
   */
  normal_bosses_killed: number;
  /**
   * Human readable summary of progression:
   * @example "4/10 H"
   */
  summary: string;
  /**
   * Number of bosses in instance
   * @min 1
   * @example 10
   */
  total_bosses: number;
}

export interface ManaforgeOmega1 {
  heroic?: Normal;
  mythic?: Normal;
  normal?: Normal;
}

export interface Model1 {
  scores: Scores;
  season: string;
  segments: Segments;
}

export interface Model10 {
  progression?: Progression;
}

export interface Model2 {
  /**
   * Description of the affix
   * @example "While in combat, Xal'atath rains down orbs of cosmic energy that empower enemies or players."
   */
  description: string;
  /**
   * Icon file name for the affix
   * @example "inv_nullstone_cosmicvoid"
   */
  icon: string;
  /**
   * cdn URL to the wow icon for this affix
   * @example "https://cdn.raiderio.net/images/wow/icons/large/inv_nullstone_cosmicvoid.jpg"
   */
  icon_url: string;
  /**
   * Affix ID
   * @example 148
   */
  id: number;
  /**
   * Name of the affix
   * @example "Xal'atath's Bargain: Ascendant"
   */
  name: string;
  /**
   * Wowhead URL for the affix
   * @example "https://wowhead.com/affix=148"
   */
  wowhead_url: string;
}

export interface Model3 {
  /** List of affixes applied to this run */
  affixes: Affixes;
  /**
   * URL to the background image for this dungeon
   * @example "https://cdn.raiderio.net/images/dungeons/expansion8/base/mists-of-tirna-scithe.jpg"
   */
  background_image_url: string;
  /**
   * How long it took to complete the dungeon, in milliseconds
   * @min 1
   * @example 1636548
   */
  clear_time_ms: number;
  /**
   * When this run was completed
   * @format date-time
   * @example "2024-09-22T03:02:51.000Z"
   */
  completed_at: string;
  /**
   * Friendly name of Dungeon
   * @example "Mists of Tirna Scithe"
   */
  dungeon: string;
  /**
   * URL to the wow icon for this dungeon
   * @example "https://cdn.raiderio.net/images/wow/icons/large/achievement_dungeon_mistsoftirnascithe.jpg"
   */
  icon_url: string;
  /**
   * Unique ID of this run within the specific season
   * @example 16196237
   */
  keystone_run_id: number;
  /**
   * The map challenge mode ID for the dungeon
   * @example 375
   */
  map_challenge_mode_id: number;
  /**
   * Mythic+ Level of the run
   * @min 2
   * @example 10
   */
  mythic_level: number;
  /**
   * How many times the keystone used for this dungeon would have been upgraded after completion
   * @min 0
   * @example 2
   */
  num_keystone_upgrades: number;
  /**
   * The par time for the dungeon, in milliseconds
   * @min 1
   * @example 1800999
   */
  par_time_ms: number;
  /**
   * How many points this run was worth
   * @example 326.6
   */
  score: number;
  /**
   * Shortened or abbreviated name of Dungeon
   * @example "MISTS"
   */
  short_name: string;
  /**
   * URL to this specific run to view roster details
   * @example "https://raider.io/mythic-plus-runs/season-tww-1/5376417-10-mists-of-tirna-scithe"
   */
  url: string;
  /**
   * The static expansion id for this particular dungeon.
   * @example 8
   */
  zone_expansion_id: number;
  /**
   * The zone ID for the dungeon
   * @example 13334
   */
  zone_id: number;
}

export interface Model4 {
  /**
   * Character's achievement points
   * @example 23905
   */
  achievement_points: number;
  /**
   * Name of character's active spec
   * @example "Affliction"
   */
  active_spec_name: string;
  /**
   * Name of the role for character's active spec
   * @example "DPS"
   */
  active_spec_role: string;
  /**
   * Name of character's class
   * @example "Warlock"
   */
  class: string;
  /** Character's faction */
  faction: Faction;
  gear?: Gear;
  /**
   * Character's gender
   * @example "female"
   */
  gender: string;
  /**
   * When this character was last crawled
   * @format date
   * @example "2024-10-09T04:31:20.000Z"
   */
  last_crawled_at: string;
  /** Character's alternate highest scoring Mythic+ runs from current season */
  mythic_plus_alternate_runs?: MythicPlusAlternateRuns;
  /** Character's highest scoring Mythic+ runs from current season */
  mythic_plus_best_runs?: MythicPlusBestRuns;
  /** Character's current season Mythic+ Ranks across all leaderboards and roles */
  mythic_plus_ranks?: MythicPlusRanks;
  /** Character's most recent Mythic+ runs from current season */
  mythic_plus_recent_runs?: MythicPlusRecentRuns;
  /** Character's Mythic+ scores by season */
  mythic_plus_scores_by_season?: MythicPlusScoresBySeason;
  /**
   * Name of character
   * @example "Ulsoga"
   */
  name: string;
  /** Character's previous season Mythic+ Ranks across all leaderboards and roles */
  previous_mythic_plus_ranks?: PreviousMythicPlusRanks;
  /**
   * RaiderIO Character Banner Profile
   * @example "classbanner_paladin1"
   */
  profile_banner: string;
  /**
   * URL for Character's profile on Raider.IO
   * @example "https://raider.io/characters/us/skullcrusher/Ulsoga"
   */
  profile_url: string;
  /**
   * Name of character's race
   * @example "Orc"
   */
  race: string;
  raid_progression?: RaidProgression;
  /**
   * Realm character resides on
   * @example "Skullcrusher"
   */
  realm: string;
  /** Region character belongs to */
  region: Region;
  /**
   * URL for blizzards character's thumbnail
   * @example "https://render.worldofwarcraft.com/us/character/burning-blade/0/239444992-avatar.jpg?alt=/wow/static/images/2d/avatar/1-0.jpg"
   */
  thumbnail_url: string;
  /**
   * Animated Character Page Banner
   * @example false
   */
  use_animated_banner?: boolean;
  /** Raid curve - added manually*/
  raid_achievement_curve: arrray
}

export interface Model5 {
  /** Guild's faction */
  faction: Faction1;
  /**
   * Name of guild
   * @example "Ludicrous Speed"
   */
  name: string;
  /**
   * URL for Guild's profile on Raider.IO
   * @example "https://raider.io/guilds/us/skullcrusher/Ludicrous%20Speed"
   */
  profile_url: string;
  raid_progression?: RaidProgression;
  raid_rankings?: RaidRankings;
  /**
   * Realm guild resides on
   * @example "Skullcrusher"
   */
  realm: string;
  /** Region guild belongs to */
  region: Region1;
}

export interface Model6 {
  /**
   * Description of the effects of this affix
   * @example "When any non-boss enemy dies, its death cry empowers nearby allies, increasing their maximum health and damage by 20%."
   */
  description: string;
  /**
   * Blizzard's Icon for this affix
   * @example "inv_misc_volatilewater"
   */
  icon?: string;
  /**
   * URL to the icon for this affix
   * @example "https://cdn.raiderio.net/images/wow/icons/large/inv_misc_volatilewater.jpg"
   */
  icon_url?: string;
  /**
   * Blizzard's ID for this affix
   * @example 7
   */
  id: number;
  /**
   * Friendly name for this affix
   * @example "Bolstering"
   */
  name: string;
  /**
   * URL to open details on this affix on Wowhead
   * @example "https://wowhead.com/affix=7"
   */
  wowhead_url: string;
}

export interface Model7 {
  /** List of details for each active affix */
  affix_details: AffixDetails;
  /** @example "https://raider.io/mythic-plus-affix-rankings/all/kr/leaderboards-strict/bolstering-grievous-tyrannical" */
  leaderboard_url: string;
  recent_run?: Model3;
  /** Region that affixes are for */
  region: Region2;
  /**
   * Human readable title for the current affixes
   * @example "Bolstering, Grievous, Tyrannical"
   */
  title: string;
}

export interface Model8 {
  /** @example "2017-01-24T17:31:00.000Z" */
  defeatedAt: string;
  guild?: Guild;
}

export interface Model9 {
  guilds?: Guilds;
  /**
   * How many bosses out of all bosses in this instance
   * @min 1
   * @example 1
   */
  progress: number;
  /**
   * The number of guilds that are at this point of progression
   * @min 0
   * @example 98
   */
  totalGuilds: number;
}

/** Character's alternate highest scoring Mythic+ runs from current season */
export type MythicPlusAlternateRuns = Model3[];

/** Character's highest scoring Mythic+ runs from current season */
export type MythicPlusBestRuns = Model3[];

/** Character's current season Mythic+ Ranks across all leaderboards and roles */
export interface MythicPlusRanks {
  /** Rank across all roles from player's class */
  class: Class;
  /** Rank across DPS from player's class */
  class_dps: ClassDps;
  /** Rank across healers from player's class */
  class_healer: ClassHealer;
  /** Rank across tanks from player's class */
  class_tank: ClassTank;
  /** Rank across DPS from any classes */
  dps: Dps1;
  /** Rank across healers from any classes */
  healer: Healer1;
  /** Rank across all classes/roles */
  overall: Overall;
  /** Rank across tanks from any classes */
  tank: Tank1;
}

/** Character's most recent Mythic+ runs from current season */
export type MythicPlusRecentRuns = Model3[];

/** Character's Mythic+ scores by season */
export type MythicPlusScoresBySeason = Model1[];

export interface Normal {
  /**
   * Realm rank
   * @example 20
   */
  realm: number;
  /**
   * Region rank
   * @example 564
   */
  region: number;
  /**
   * World rank
   * @example 799
   */
  world: number;
}

/** Rank across all classes/roles */
export interface Overall {
  /**
   * Realm rank
   * @example 20
   */
  realm: number;
  /**
   * Region rank
   * @example 564
   */
  region: number;
  /**
   * World rank
   * @example 799
   */
  world: number;
}

/** Character's previous season Mythic+ Ranks across all leaderboards and roles */
export interface PreviousMythicPlusRanks {
  /** Rank across all roles from player's class */
  class: Class;
  /** Rank across DPS from player's class */
  class_dps: ClassDps;
  /** Rank across healers from player's class */
  class_healer: ClassHealer;
  /** Rank across tanks from player's class */
  class_tank: ClassTank;
  /** Rank across DPS from any classes */
  dps: Dps1;
  /** Rank across healers from any classes */
  healer: Healer1;
  /** Rank across all classes/roles */
  overall: Overall;
  /** Rank across tanks from any classes */
  tank: Tank1;
}

export type Progression = Model9[];

export interface RaidProgression {
  "aberrus-the-shadowed-crucible"?: ManaforgeOmega;
  "amirdrassil-the-dreams-hope"?: ManaforgeOmega;
  "antorus-the-burning-throne"?: ManaforgeOmega;
  "awakened-aberrus-the-shadowed-crucible"?: ManaforgeOmega;
  "awakened-amirdrassil-the-dreams-hope"?: ManaforgeOmega;
  "awakened-vault-of-the-incarnates"?: ManaforgeOmega;
  "battle-of-dazaralor"?: ManaforgeOmega;
  "blackrock-depths"?: ManaforgeOmega;
  "castle-nathria"?: ManaforgeOmega;
  "crucible-of-storms"?: ManaforgeOmega;
  "fated-castle-nathria"?: ManaforgeOmega;
  "fated-sanctum-of-domination"?: ManaforgeOmega;
  "fated-sepulcher-of-the-first-ones"?: ManaforgeOmega;
  "liberation-of-undermine"?: ManaforgeOmega;
  "manaforge-omega"?: ManaforgeOmega;
  "nerubar-palace"?: ManaforgeOmega;
  "nyalotha-the-waking-city"?: ManaforgeOmega;
  "sanctum-of-domination"?: ManaforgeOmega;
  "sepulcher-of-the-first-ones"?: ManaforgeOmega;
  "the-emerald-nightmare"?: ManaforgeOmega;
  "the-eternal-palace"?: ManaforgeOmega;
  "the-nighthold"?: ManaforgeOmega;
  "tomb-of-sargeras"?: ManaforgeOmega;
  "trial-of-valor"?: ManaforgeOmega;
  "vault-of-the-incarnates"?: ManaforgeOmega;
  uldir?: ManaforgeOmega;
}

export interface RaidRankings {
  "aberrus-the-shadowed-crucible"?: ManaforgeOmega1;
  "amirdrassil-the-dreams-hope"?: ManaforgeOmega1;
  "antorus-the-burning-throne"?: ManaforgeOmega1;
  "awakened-aberrus-the-shadowed-crucible"?: ManaforgeOmega1;
  "awakened-amirdrassil-the-dreams-hope"?: ManaforgeOmega1;
  "awakened-vault-of-the-incarnates"?: ManaforgeOmega1;
  "battle-of-dazaralor"?: ManaforgeOmega1;
  "blackrock-depths"?: ManaforgeOmega1;
  "castle-nathria"?: ManaforgeOmega1;
  "crucible-of-storms"?: ManaforgeOmega1;
  "fated-castle-nathria"?: ManaforgeOmega1;
  "fated-sanctum-of-domination"?: ManaforgeOmega1;
  "fated-sepulcher-of-the-first-ones"?: ManaforgeOmega1;
  "liberation-of-undermine"?: ManaforgeOmega1;
  "manaforge-omega"?: ManaforgeOmega1;
  "nerubar-palace"?: ManaforgeOmega1;
  "nyalotha-the-waking-city"?: ManaforgeOmega1;
  "sanctum-of-domination"?: ManaforgeOmega1;
  "sepulcher-of-the-first-ones"?: ManaforgeOmega1;
  "the-emerald-nightmare"?: ManaforgeOmega1;
  "the-eternal-palace"?: ManaforgeOmega1;
  "the-nighthold"?: ManaforgeOmega1;
  "tomb-of-sargeras"?: ManaforgeOmega1;
  "trial-of-valor"?: ManaforgeOmega1;
  "vault-of-the-incarnates"?: ManaforgeOmega1;
  uldir?: ManaforgeOmega1;
}

export interface Realm {
  /**
   * Whether the realm is part of a connected realm
   * @example false
   */
  isConnected: boolean;
  /**
   * Name of the realm
   * @example "Skullcrusher"
   */
  name: string;
  /**
   * Slug for the realm, suitable for putting in URLs
   * @example "skullcrusher"
   */
  slug: string;
}

/**
 * Region character belongs to
 * @example "us"
 */
export enum Region {
  Us = "us",
  Eu = "eu",
  Tw = "tw",
  Kr = "kr",
  Cn = "cn",
}

/**
 * Region guild belongs to
 * @example "us"
 */
export enum Region1 {
  Us = "us",
  Eu = "eu",
  Tw = "tw",
  Kr = "kr",
  Cn = "cn",
}

/**
 * Region that affixes are for
 * @example "kr"
 */
export enum Region2 {
  Us = "us",
  Eu = "eu",
  Tw = "tw",
  Kr = "kr",
  Cn = "cn",
}

export interface Region3 {
  /**
   * Name of the region
   * @example "United States & Oceania"
   */
  name: string;
  /**
   * Short name of the region
   * @example "US"
   */
  short_name: string;
  /**
   * Slug for the region, suitable for putting in URLs
   * @example "us"
   */
  slug: string;
}

export interface Scores {
  spec_0: number;
  spec_1: number;
  spec_2: number;
  spec_3: number;
  all: number;
  dps: number;
  healer: number;
  tank: number;
}

export interface Segments {
  spec_0: Spec0;
  spec_1: Spec1;
  spec_2: Spec2;
  spec_3: Spec3;
  all: All;
  dps: Dps;
  healer: Healer;
  tank: Tank;
}

export interface Spec0 {
  color: string;
  score: number;
}

export interface Spec1 {
  color: string;
  score: number;
}

export interface Spec2 {
  color: string;
  score: number;
}

export interface Spec3 {
  color: string;
  score: number;
}

export interface Tank {
  color: string;
  score: number;
}

/** Rank across tanks from any classes */
export interface Tank1 {
  /**
   * Realm rank
   * @example 20
   */
  realm: number;
  /**
   * Region rank
   * @example 564
   */
  region: number;
  /**
   * World rank
   * @example 799
   */
  world: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://raider.io";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
          .then((data) => {
            if (r.ok) {
              r.data = data;
            } else {
              r.error = data;
            }
            return r;
          })
          .catch((e) => {
            r.error = e;
            return r;
          });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Raider.IO Developer API
 * @version 0.62.5
 * @baseUrl https://raider.io
 * @contact Raider.IO <hello@raider.io> (https://support.raider.io)
 *
 * Raider.IO provides detailed character and guild rankings for Raiding and Mythic+ content. If you run into problems using our API, or have any feedback for us then please reach out to us on Discord https://discord.gg/raider channel #api-discussions.
 *
 * We'd appreciate getting linked back from any integrations with this API, and we're always interested in hearing what people are building, so join us in Discord and let us know!
 *
 * Requests from unauthenticated applications to this API are limited to 300 requests per minute. To unlock higher request rates you must register your application with RaiderIO here: https://raider.io/settings/apps
 *
 * For commercial use, please contact us below:
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags general
     * @name GetApiV1Periods
     * @summary Retrieve the current, previous, and next period ids and date ranges
     * @request GET:/api/v1/periods
     */
    getApiV1Periods: (
      query: GetApiV1PeriodsParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/periods`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags character
     * @name GetApiV1CharactersProfile
     * @summary Retrieve information about a character.
     * @request GET:/api/v1/characters/profile
     */
    getApiV1CharactersProfile: (
      query: GetApiV1CharactersProfileParams,
      params: RequestParams = {},
    ) =>
      this.request<Model4, any>({
        path: `/api/v1/characters/profile`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags guild
     * @name GetApiV1GuildsBosskill
     * @summary Retrieve information about a guild boss kill.
     * @request GET:/api/v1/guilds/boss-kill
     */
    getApiV1GuildsBosskill: (
      query: GetApiV1GuildsBosskillParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/guilds/boss-kill`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags guild
     * @name GetApiV1GuildsProfile
     * @summary Retrieve information about a guild.
     * @request GET:/api/v1/guilds/profile
     */
    getApiV1GuildsProfile: (
      query: GetApiV1GuildsProfileParams,
      params: RequestParams = {},
    ) =>
      this.request<Model5, any>({
        path: `/api/v1/guilds/profile`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mythic_plus
     * @name GetApiV1MythicplusAffixes
     * @summary Retrieve the affixes for a specific region, including the latest run seen with this affix
     * @request GET:/api/v1/mythic-plus/affixes
     */
    getApiV1MythicplusAffixes: (
      query: GetApiV1MythicplusAffixesParams,
      params: RequestParams = {},
    ) =>
      this.request<Model7, any>({
        path: `/api/v1/mythic-plus/affixes`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mythic_plus
     * @name GetApiV1MythicplusLeaderboardcapacity
     * @summary Retrieve the leaderboard capacity for a region including lowest level and time to qualify
     * @request GET:/api/v1/mythic-plus/leaderboard-capacity
     */
    getApiV1MythicplusLeaderboardcapacity: (
      query: GetApiV1MythicplusLeaderboardcapacityParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/mythic-plus/leaderboard-capacity`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mythic_plus
     * @name GetApiV1MythicplusRundetails
     * @summary Retrieve details for a specific Mythic+ run
     * @request GET:/api/v1/mythic-plus/run-details
     */
    getApiV1MythicplusRundetails: (
      query: GetApiV1MythicplusRundetailsParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/mythic-plus/run-details`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mythic_plus
     * @name GetApiV1MythicplusRuns
     * @summary Retrieve information about the top runs that match the given criteria
     * @request GET:/api/v1/mythic-plus/runs
     */
    getApiV1MythicplusRuns: (
      query: GetApiV1MythicplusRunsParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/mythic-plus/runs`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mythic_plus
     * @name GetApiV1MythicplusScoretiers
     * @summary Retrieve the colors used for score tiers in the given season.
     * @request GET:/api/v1/mythic-plus/score-tiers
     */
    getApiV1MythicplusScoretiers: (
      query: GetApiV1MythicplusScoretiersParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/mythic-plus/score-tiers`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mythic_plus
     * @name GetApiV1MythicplusSeasoncutoffs
     * @summary Retrieve the Mythic+ Season cutoffs for a region
     * @request GET:/api/v1/mythic-plus/season-cutoffs
     */
    getApiV1MythicplusSeasoncutoffs: (
      query: GetApiV1MythicplusSeasoncutoffsParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/mythic-plus/season-cutoffs`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mythic_plus
     * @name GetApiV1MythicplusStaticdata
     * @summary Retrieve mythic plus season and dungeon static data for a specific expansion (slugs, names, etc.)
     * @request GET:/api/v1/mythic-plus/static-data
     */
    getApiV1MythicplusStaticdata: (
      query: GetApiV1MythicplusStaticdataParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/mythic-plus/static-data`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags raiding
     * @name GetApiV1RaidingBossrankings
     * @summary Retrieve the boss rankings for a given raid and region
     * @request GET:/api/v1/raiding/boss-rankings
     */
    getApiV1RaidingBossrankings: (
      query: GetApiV1RaidingBossrankingsParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/raiding/boss-rankings`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags raiding
     * @name GetApiV1RaidingHalloffame
     * @summary Retrieve the hall of fame for a given raid
     * @request GET:/api/v1/raiding/hall-of-fame
     */
    getApiV1RaidingHalloffame: (
      query: GetApiV1RaidingHalloffameParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/raiding/hall-of-fame`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags raiding
     * @name GetApiV1RaidingProgression
     * @summary Retrieve details of raiding progression for a raid
     * @request GET:/api/v1/raiding/progression
     */
    getApiV1RaidingProgression: (
      query: GetApiV1RaidingProgressionParams,
      params: RequestParams = {},
    ) =>
      this.request<Model10, any>({
        path: `/api/v1/raiding/progression`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags raiding
     * @name GetApiV1RaidingRaidrankings
     * @summary Retrieve the raid rankings for a given raid and region
     * @request GET:/api/v1/raiding/raid-rankings
     */
    getApiV1RaidingRaidrankings: (
      query: GetApiV1RaidingRaidrankingsParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/raiding/raid-rankings`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags raiding
     * @name GetApiV1RaidingStaticdata
     * @summary Retrieve raid and boss static data for a specific expansion (slugs, names, etc.)
     * @request GET:/api/v1/raiding/static-data
     */
    getApiV1RaidingStaticdata: (
      query: GetApiV1RaidingStaticdataParams,
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/api/v1/raiding/static-data`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
}
