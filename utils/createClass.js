import client from "app/libs/prismadb";

export default async function createClass(name) {
  const times = [
    { startTime: "9 am", endTime: "10 am" },
    { startTime: "10 am", endTime: "11 am" },
    { startTime: "11 am", endTime: "12 pm" },
    { startTime: "12 pm", endTime: "1 pm" },
    { startTime: "1 pm", endTime: "2 pm" },
    { startTime: "2 pm", endTime: "3 pm" },
    { startTime: "3 pm", endTime: "4 pm" },
  ];
  const newClass = await client.classes.create({
    data: {
      name,
      daySlot: {
        create: [
          {
            name: "monday",
            timeSlots: {
              create: [
                { startTime: "9 am", endTime: "10 am" },
                { startTime: "10 am", endTime: "11 am" },
                { startTime: "11 am", endTime: "12 pm" },
                { startTime: "12 pm", endTime: "1 pm" },
                { startTime: "1 pm", endTime: "2 pm" },
                { startTime: "2 pm", endTime: "3 pm" },
                { startTime: "3 pm", endTime: "4 pm" },
              ],
            },
          },
          {
            name: "Tuesday",
            timeSlots: {
              create: [
                { startTime: "9 am", endTime: "10 am" },
                { startTime: "10 am", endTime: "11 am" },
                { startTime: "11 am", endTime: "12 pm" },
                { startTime: "12 pm", endTime: "1 pm" },
                { startTime: "1 pm", endTime: "2 pm" },
                { startTime: "2 pm", endTime: "3 pm" },
                { startTime: "3 pm", endTime: "4 pm" },
              ],
            },
          },
          {
            name: "Wednesday",
            timeSlots: {
              create: [
                { startTime: "9 am", endTime: "10 am" },
                { startTime: "10 am", endTime: "11 am" },
                { startTime: "11 am", endTime: "12 pm" },
                { startTime: "12 pm", endTime: "1 pm" },
                { startTime: "1 pm", endTime: "2 pm" },
                { startTime: "2 pm", endTime: "3 pm" },
                { startTime: "3 pm", endTime: "4 pm" },
              ],
            },
          },
          {
            name: "Thrusday",
            timeSlots: {
              create: [
                { startTime: "9 am", endTime: "10 am" },
                { startTime: "10 am", endTime: "11 am" },
                { startTime: "11 am", endTime: "12 pm" },
                { startTime: "12 pm", endTime: "1 pm" },
                { startTime: "1 pm", endTime: "2 pm" },
                { startTime: "2 pm", endTime: "3 pm" },
                { startTime: "3 pm", endTime: "4 pm" },
              ],
            },
          },
          {
            name: "Friday",
            timeSlots: {
              create: [
                { startTime: "9 am", endTime: "10 am" },
                { startTime: "10 am", endTime: "11 am" },
                { startTime: "11 am", endTime: "12 pm" },
                { startTime: "12 pm", endTime: "1 pm" },
                { startTime: "1 pm", endTime: "2 pm" },
                { startTime: "2 pm", endTime: "3 pm" },
                { startTime: "3 pm", endTime: "4 pm" },
              ],
            },
          },
        ],
      },
    },
  });

  // return (await client.classes.findMany({where:{id:"6522b2c6ee86100bdfeda6cf"},select:{daySlot:{select:{timeSlots:true}}}}))
  return newClass;
}
