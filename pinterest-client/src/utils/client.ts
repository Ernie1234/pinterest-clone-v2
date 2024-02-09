import { createClient, type ClientConfig } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const config: ClientConfig = {
  projectId: "xq0lna9w", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2022-03-07", // use current date (YYYY-MM-DD) to target the latest API version
  token:
    "skR1D6b1LgCnMobBryys4OEt1yKK65uRiMNYjDnrq0GPv2Uj75jRJGj3t8wYSPRrb9NspVQjhjqJamGntbwNB1wpbgptQO6cige26nGLZEUExEup6L43xXVY4AdzI1WVbh1exM8vx16spgHwgStW5UdDHf22F3uYAt8vqcyhH94XoFQUfEK5", // Find this in the “API” tab of your project’s settings
};
export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
