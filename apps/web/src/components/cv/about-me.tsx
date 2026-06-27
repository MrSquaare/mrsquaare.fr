import type { FC } from "react";

import {
  Card,
  CardSection,
  CardSeparator,
  CardTitle,
} from "@sandwich-ui/react";

import { m } from "../../paraglide/messages";

export const AboutMe: FC = () => {
  return (
    <section>
      <Card>
        <CardSection>
          <CardTitle>{m["cv.about_me.title"]()}</CardTitle>
        </CardSection>
        <CardSeparator />
        <CardSection>
          <p>{m["cv.about_me.content"]()}</p>
        </CardSection>
      </Card>
    </section>
  );
};
