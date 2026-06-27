import type { FC } from "react";

import { Icon } from "@iconify-icon/react";
import {
  Card,
  CardSection,
  CardSeparator,
  CardTitle,
} from "@sandwich-ui/react";
import { sva } from "@sandwich-ui/styled-system/css";

import {
  BLUESKY_LINK,
  LINKEDIN_LINK,
  MAIL,
  MAIL_LINK,
} from "../../constants/link";
import { m } from "../../paraglide/messages";

const contactsRecipe = sva({
  base: {
    contactItem: {
      alignItems: "center",
      display: "flex",
      gap: 1,
    },
  },
  slots: ["contactItem"],
});

export const Contacts: FC = () => {
  const classes = contactsRecipe();

  return (
    <section>
      <Card>
        <CardSection>
          <CardTitle>{m["cv.contacts.title"]()}</CardTitle>
        </CardSection>
        <CardSeparator />
        <CardSection>
          <ul>
            <li className={classes.contactItem}>
              <Icon icon={"ph:envelope"} />
              <a
                href={MAIL_LINK}
                referrerPolicy={"no-referrer"}
                rel={"noreferrer"}
                target={"_blank"}
              >
                {MAIL}
              </a>
            </li>
            <li className={classes.contactItem}>
              <Icon icon={"simple-icons:linkedin"} />
              <a
                href={LINKEDIN_LINK}
                referrerPolicy={"no-referrer"}
                rel={"noreferrer"}
                target={"_blank"}
              >
                g-bonnet
              </a>
            </li>
            <li className={classes.contactItem}>
              <Icon icon={"simple-icons:bluesky"} />
              <a
                href={BLUESKY_LINK}
                referrerPolicy={"no-referrer"}
                rel={"noreferrer"}
                target={"_blank"}
              >
                @mrsquaare.fr
              </a>
            </li>
          </ul>
        </CardSection>
      </Card>
    </section>
  );
};
