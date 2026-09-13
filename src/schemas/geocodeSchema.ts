import { z } from "zod";

// const GeocodeSchema = z.object({
//   zip: z.string(),
//   name: z.string(),
//   lat: z.number(),
//   lon: z.number(),
//   country: z.string().length(2),
// });

// export const GeocodeSchema = z.array(
//   z.object({
//     name: z.string(),
//     // local_names: z.record(z.string()).optional(),
//     local_names: z.record(z.string(), z.string()),
//     // zip: z.string(),
//     lat: z.number(),
//     lon: z.number(),
//     country: z.string().length(2),
//     state: z.string().length(2).optional(),
//   }),
// );

export const GeocodeSchema = z.array(
  z.object({
    name: z.string(),
    local_names: z.record(z.string(), z.string()).optional(),
    lat: z.number(),
    lon: z.number(),
    country: z.string().length(2),
    state: z.string().optional(),
  }),
);

export type Geocode = z.infer<typeof GeocodeSchema>;
