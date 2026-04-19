export interface ManualSection {
  heading: string;
  paragraphs: string[];
}

export interface ManualTableRow {
  action: string;
  code?: string;
  meaning?: string;
  symbol?: string;
}

export const hypersolarSystemSections: ManualSection[] = [
  {
    heading: "Nautilus",
    paragraphs: [
      "Nautilus is an oceanic planet, its surface almost entirely engulfed by freshwater seas, leaving scarcely any land to interrupt the vast, uninterrupted expanse. Civilization is concentrated into a single urban center, the capital city of Harba, which rises as the lone hub of structured society amid the planetary waters. The population is sparse yet strikingly diverse, composed of a wide range of sentient species; however, true extraterrestrial beings account for only a small fraction of the biosphere, dwarfed by the overwhelming dominance of aquatic life, particularly the innumerable varieties of alien fish that define the planet’s ecosystems.",
      "The climate trends are cool and stable, with prolonged stretches of clear skies that belie an important hazard: Nautilus possesses a relatively thin atmosphere, resulting in elevated ultraviolet radiation levels at the surface. Visitors and inhabitants alike must remain vigilant against UV exposure despite the otherwise calm and visually serene conditions.",
      "Economically, the planet’s isolation and specialisation have shaped it into a major exporter of marine resources, with oil, processed sands, and a variety of underwater fauna forming the backbone of its trade.",
    ],
  },
  {
    heading: "Mackelvie",
    paragraphs: [
      "Mackelvie is one of the hottest planets in the Hypersolar System, characterized by intense surface temperatures and a predominantly arid climate. Approximately 80% of the planet’s surface is covered by desert and tundra, while the remaining 20% consists of water bodies. The planet’s terrain is dominated by expansive deserts, with minimal vegetation or habitable land. Mackelvie experiences consistently high temperatures, making it one of the hottest planets in the Hypersolar System.",
      "Weather conditions are harsh and unstable. Strong, hot winds are common, often creating dangerous sandstorms and reducing visibility. These environmental factors contribute to the planet’s overall hostility to life and travel. Mackelvie has a thick and toxic atmosphere. Any unequipped vehicle attempting to enter or land on the planet is unlikely to survive. Emergency landings on Mackelvie are strongly discouraged under all circumstances due to the extreme danger posed by atmospheric and surface conditions.",
      "The dominant species inhabiting Mackelvie is the Grob. Mackelvie’s primary economic activity revolves around the extraction and export of minerals. The planet is rich in natural resources, and its major exports include refined tools, advanced vehicles and vehicle parts, which are distributed throughout the Hypersolar System from the capital, Morepick.",
    ],
  },
  {
    heading: "Asperion",
    paragraphs: [
      "Asperion is the third planet of the Hypersolar System, noted for its balanced geography between land and water. Its moderate environmental conditions make it one of the more laid back and stable planets in the system. This planet features a diverse landscape of oceans, plains and fertile land, with a cool and stable temperature range. For this reason, Asperion supports a wide variety of ecosystems.",
      "A defining feature of Asperion is its heavy cloud coverage. It is considered the most cloudy planet in the Hypersolar System, with skies frequently overcast. This results in diffused sunlight and relatively mild surface conditions, with limited exposure to extreme heat. Asperion possesses a normal, breathable atmosphere, suitable for both its native inhabitants and visiting species. The thick cloud layers contribute to climate regulation, helping maintain consistent temperatures across the planet.",
      "The dominant species on Asperion is the Kindor. Asperion’s economy is largely based on agriculture and food production. The planet’s fertile lands and stable climate allow for large-scale cultivation, making food its primary export to other planets within the Hypersolar System.",
    ],
  },
  {
    heading: "Feradris",
    paragraphs: [
      "Feradris is the largest known planet in the Hypersolar System. Approximately 70% of its surface is covered by water, with the remaining land consisting of scattered continents and resource-rich regions. Its warm climate and frequent rainfall contribute to a dynamic and active environment. The planet’s geography is largely oceanic, with expansive seas and relatively limited landmasses. These land areas are often rich in minerals and serve as key sites for settlement and industry.",
      "Feradris experiences a warm climate with high humidity. Rainfall is frequent across much of the planet, driven by its slightly dense atmosphere and extensive water coverage. Storms and heavy rain are common, particularly over ocean regions. The atmosphere of Feradris is slightly thicker than average, contributing to its warm temperatures and regular precipitation. While still generally survivable, the increased density can affect flight and atmospheric entry, requiring minor adaptations for off-world vehicles.",
      "Feradris is dominantly inhabited by the Rulix. The economy of Feradris is driven by the extraction and processing of minerals. Both raw and refined materials are major exports, making the planet an important supplier of industrial resources within the Hypersolar System.",
    ],
  },
  {
    heading: "Taurino",
    paragraphs: [
      "Taurino is the smallest planet in the Hypersolar System. Its surface is composed of approximately 60% land and 40% water, providing a balanced environment for habitation and industry. Despite its size, Taurino plays a significant role in interplanetary trade. The planet features a mix of landmasses, including plains and developed regions, alongside smaller bodies of water. Taurino maintains a generally stable and moderate climate, with temperatures considered normal compared to other planets in the system.",
      "Regular breezes are a defining characteristic of Taurino’s weather, influenced by its thick atmosphere. These winds are typically mild but persistent. Taurino has a thick atmosphere that supports stable environmental conditions and contributes to its frequent breezes. The atmosphere is generally habitable, though its density may slightly affect flight and atmospheric travel.",
      "Taurino has a diverse population, primarily composed of both the Kindor and Rulix species. The Grob population on Taurino is the smallest compared to their presence on other planets in the Hypersolar System. Taurino’s economy is centered on the production and export of medicine and garments. Its advancements in medical development make it a key supplier of healthcare-related goods, while its textile industry produces a variety of clothing and materials for export.",
    ],
  },
];

export const raceSections: ManualSection[] = [
  {
    heading: "Rulix",
    paragraphs: [
      "Rulix are considered the most versatile species in the Hypersolar System. Their biology allows them to inhabit nearly any planetary environment, from extreme desert worlds to humid oceanic regions. This adaptability has led to a wide variation in Rulix cultures and lifestyles.",
      "Rulix tend to be individualistic, often prioritizing personal goals or localized interests over collective unity. As a result, their societies can vary greatly depending on their environment.",
      "In terms of relationships with other races, Rulix maintain a good relationship with Kindor, with a strong hate towards Grobs, particularly for their impulsive behavior, disregard for structure, and history of disrupting Rulix-controlled resource operations.",
    ],
  },
  {
    heading: "Grob",
    paragraphs: [
      "The Grob are a species often associated with unpredictability and internal cohesion, typically favoring their own kind over others. Grob are naturally suited to warm and hot environments, where they thrive both physically and culturally. They are less commonly found in cooler regions of the system.",
      "They are stereotypically viewed as chaotic, though this perception varies depending on perspective. Grob societies tend to be tightly knit internally but less open to outsiders.",
      "Grobs maintain a good relationship with Kindor. Their laid back and open nature complements the Kindor well. In contrast, the Rulix’s uptight nature and the species’ bad history with each other results in a bad relationship.",
    ],
  },
  {
    heading: "Kindor",
    paragraphs: [
      "Kindor societies are built around connection, trust, and mutual support. They tend to prioritize group well-being over individual ambition. They are emotionally intelligent, with diplomatic tendencies, prioritizing compromises instead of conflict. Due to a lack of the M gene, Kindor are highly sensitive to UV rays. They prefer to live in cooler places because of this.",
      "Kindor maintain strong positive relations with the Rulix. Their cooperative nature complements the Rulix’s structured and disciplined approach, often resulting in stable partnerships. They are also generally tolerant and patient with Grob. While they may not fully align with Grob behavior, they are more willing than other species to engage peacefully and maintain neutral relations.",
    ],
  },
];

export const anomalySections: ManualSection[] = [
  {
    heading: "Humans",
    paragraphs: [
      "Humans are the last surviving foreign species after the galactic wipe. They are highly complex and intelligent beings. They have four limbs (two arms and two legs), two eyes, and one nose. If you spot humans, advise for immediate disposal of the human. If aggressive, advise to call security personnel at $$$.",
    ],
  },
];

export const codeTroubleshootingRows: ManualTableRow[] = [
  {
    action: "The vehicle is off, advise to turn on the ignition.",
    code: "0000",
  },
  {
    action: "System is backed, advise to restart the system.",
    code: "0001",
  },
  {
    action: "Wings aren’t deployed, advise to push the big red button.",
    code: "0010",
  },
  {
    action: "Seatbelt is off, advise to secure seatbelt.",
    code: "0100",
  },
  {
    action:
      "Rocket oil aged, advise to replace rocket oil as soon as possible.",
    code: "1000",
  },
  {
    action: "Rocket malfunction, advise to call the vehicle manufacturer.",
    code: "0011",
  },
  {
    action: "Vehicle in critical state, advise to eject the vehicle.",
    code: "1011",
  },
  {
    action:
      "Fuel level is lower than 5%, advise to refuel as soon as possible.",
    code: "1111",
  },
];

export const spacemailRows: ManualTableRow[] = [
  {
    action:
      "Permit is not approved, travel is not permitted to the requested country. Advise to try an application at another time.",
    meaning:
      "Permit is not approved, travel is not permitted to the requested country. Advise to try an application at another time.",
    symbol: "Ꜿ",
  },
  {
    action:
      "Permit is approved under watch, further documents required. Advise to visit the nearest station as soon as possible and present documents to validate travel permit.",
    meaning:
      "Permit is approved under watch, further documents required. Advise to visit the nearest station as soon as possible and present documents to validate travel permit.",
    symbol: "Δ",
  },
  {
    action:
      "Permit is not approved for security reasons and the requestee will be detained soon. Advise to not resist security personnel once they arrive.",
    meaning:
      "Permit is not approved for security reasons and the requestee will be detained soon. Advise to not resist security personnel once they arrive.",
    symbol: "¤",
  },
  {
    action:
      "Permit is not approved for weather reasons. Administrators will send requestee further details. Advise to wait for further instructions and information via spacemail.",
    meaning:
      "Permit is not approved for weather reasons. Administrators will send requestee further details. Advise to wait for further instructions and information via spacemail.",
    symbol: "Ļ",
  },
  {
    action:
      "Permit is approved with strict limits. Advise to visit www.myspacetravel-permits.glc for visitation limitations.",
    meaning:
      "Permit is approved with strict limits. Advise to visit www.myspacetravel-permits.glc for visitation limitations.",
    symbol: "ỽ",
  },
  {
    action:
      "Permit is approved, the requestee may visit the requested destination.",
    meaning:
      "Permit is approved, the requestee may visit the requested destination.",
    symbol: "ʬ",
  },
];
