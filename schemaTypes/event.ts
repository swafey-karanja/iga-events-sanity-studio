
import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Events",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Event Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "badge",
      title: "Event Badge",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Display Title",
      type: "string",
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    // Image URLs
    defineField({
      name: "image",
      title: "Event Image URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      // validation: (Rule) => Rule.required(),
    }),

    // Event dates
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Optional. Leave empty for single-day events.",
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          if (!endDate) return true;

          const startDate = context.document?.startDate as
            | string
            | undefined;

          if (startDate && endDate < startDate) {
            return "End date cannot be before the start date.";
          }

          return true;
        }),
    }),

    // Location
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),

    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // External website
    defineField({
      name: "websiteUrl",
      title: "Event Website URL",
      type: "url",
      description: "The external website visitors will be directed to.",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),

    // Additional information
    // defineField({
    //   name: "category",
    //   title: "Event Category",
    //   type: "string",
    // }),

    // defineField({
    //   name: "guests",
    //   title: "Number of Guests",
    //   type: "number",
    //   validation: (Rule) => Rule.integer().min(0),
    // }),

    defineField({
      name: "featured",
      title: "Featured Event",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "status",
      title: "Event Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Past", value: "past" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "startDate",
    },
  },
});
