import { PanelCard } from "@/components/dashboard/panel-card";
import { AppScrollArea } from "@/components/ui/scroll-area";
import {
  anomalySections,
  codeTroubleshootingRows,
  hypersolarSystemSections,
  type ManualSection,
  raceSections,
  spacemailRows,
} from "@/lib/manual-content";

function SectionBlock({ heading, paragraphs }: ManualSection) {
  return (
    <section>
      <h2>{heading}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}

export function ManualPanel() {
  return (
    <PanelCard className="flex min-h-0 flex-1 flex-col">
      <AppScrollArea
        className="min-h-0 flex-1"
        contentClassName="pr-[clamp(0.75rem,2vw,1.25rem)]"
      >
        <div className="prose">
          <h1>The Intergalactic Space Agency Helpdesk Manual</h1>

          <section>
            <h2>Hypersolar System</h2>
            <p>
              Reference order: Nautilus, Mackelvie, Asperion, Feradris, and
              Taurino.
            </p>
          </section>

          {hypersolarSystemSections.map((section) => (
            <SectionBlock key={section.heading} {...section} />
          ))}

          <section>
            <h1>Hypersolar Races</h1>
            <p>
              The Hypersolar System is inhabited by three primary intelligent
              species: the Rulix, Grob, and Kindor. Each species possesses
              distinct biological traits, environmental preferences, and
              interspecies relationships that shape the political and social
              dynamics of the system.
            </p>
          </section>

          {raceSections.map((section) => (
            <SectionBlock key={section.heading} {...section} />
          ))}

          <section>
            <h1>Anomalies</h1>
          </section>

          {anomalySections.map((section) => (
            <SectionBlock key={section.heading} {...section} />
          ))}

          <section>
            <h1>Code Error Troubleshooting</h1>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Appropriate Action</th>
                </tr>
              </thead>
              <tbody>
                {codeTroubleshootingRows.map((row) => (
                  <tr key={row.code}>
                    <td>{row.code}</td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h1>Spacemail Symbol Troubleshooting</h1>
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Meaning and Appropriate Action</th>
                </tr>
              </thead>
              <tbody>
                {spacemailRows.map((row) => (
                  <tr key={row.symbol}>
                    <td>{row.symbol}</td>
                    <td>
                      {row.meaning?.includes(
                        "www.myspacetravel-permits.glc",
                      ) ? (
                        <>
                          Permit is approved with strict limits. Advise to visit{" "}
                          <a href="https://www.myspacetravel-permits.glc">
                            www.myspacetravel-permits.glc
                          </a>{" "}
                          for visitation limitations.
                        </>
                      ) : (
                        row.meaning
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </AppScrollArea>
    </PanelCard>
  );
}
