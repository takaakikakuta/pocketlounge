import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { sendemail } from '../functions/send-email/resource';

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  sendMail: a
      .query()
      .arguments({
        plan: a.string(),
        arrivalDate: a.string().required(),
        useDate: a.string().required(),
        shipDate: a.string(),
        pref: a.string().required(),
        venueName: a.string().required(),
        venueAddress: a.string().required(),
        name: a.string().required(),
        email: a.string().required(),
        promo: a.string(),
        photoConsent: a.boolean(),
        review:a.string(),

      })
      .returns(a.string())
      .handler(a.handler.function(sendemail))
      .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
