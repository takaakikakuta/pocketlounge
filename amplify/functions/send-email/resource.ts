import { defineFunction } from '@aws-amplify/backend';

export const sendemail = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'send-email',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment: {
    BLASTENGINE_API_KEY:"OEf9unbwT01W0gKEMLQbNK2P4TInNybiBAGrmELPQyJZDctkIKEXuj66xsvRxzZT",
    BLASTENGINE_LOGIN_ID:"be53462nd",
    FROM_EMAIL:"noreply@vizlabo.com",
    FROM_NAME:"VizlaboSchool",
    ADMIN_EMAIL:"soci0926@gmail.com"
  }
});