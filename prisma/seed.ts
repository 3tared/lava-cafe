import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create departments first
    const departments = [
      {
        title: "Owners & Founders",
        description:
          "Meet the visionaries who brought our coffee experience to life.",
      },
      {
        title: "Management Team",
        description:
          "Our experienced managers ensure everything runs smoothly day to day.",
      },
      {
        title: "Barista Team",
        description:
          "Our skilled baristas are the heart of our coffee service.",
      },
      {
        title: "Service Staff",
        description:
          "Our friendly team dedicated to making your visit exceptional.",
      },
    ];

    // Create or update departments
    for (const dept of departments) {
      await prisma.department.upsert({
        where: { title: dept.title },
        update: {},
        create: dept,
      });
    }

    // Fetch created departments
    const leadershipDept = await prisma.department.findFirst({
      where: { title: "Owners & Founders" },
    });
    const managementDept = await prisma.department.findFirst({
      where: { title: "Management Team" },
    });
    const baristaDept = await prisma.department.findFirst({
      where: { title: "Barista Team" },
    });
    const serviceDept = await prisma.department.findFirst({
      where: { title: "Service Staff" },
    });

    // Check if all departments were created successfully
    if (!leadershipDept || !managementDept || !baristaDept || !serviceDept) {
      throw new Error("One or more departments were not found.");
    }

    // Create employees
    const employees = [
      {
        name: "Yehia Mostafa",
        position: "Founder & Owner",
        email: "yehia@example.com",
        phone: "(555) 123-4567",
        bio: "With over 15 years in the coffee industry, Yehia's passion for quality coffee and community spaces led to the creation of our café.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUb0nknyNvW1tDmR2VHhknY037XN48IAvCuLKb",
        funFact: "Yehia has visited coffee farms in over 12 countries.",
        status: "Active",
        startDate: new Date("2022-01-01"),
        departmentId: leadershipDept.id, // Ensure departmentId is set
      },
      {
        name: "Galal Elsakr",
        position: "Ceo-Owner & Partner",
        email: "galal@example.com",
        phone: "(555) 234-5678",
        bio: "Galal brings his financial expertise and business acumen to ensure our café thrives while maintaining our core values.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGP5iLc1DFLq6ZIUY0BRpig5aPfV3HN7KECSt",
        funFact: "Makes the best latte art in the entire company.",
        status: "Active",
        startDate: new Date("2022-01-01"),
        departmentId: leadershipDept.id, // Ensure departmentId is set
      },
      {
        name: "Mohamed Tarek",
        position: "General Manager",
        email: "mohamed@example.com",
        phone: "(555) 345-6789",
        bio: "Mohamed oversees daily operations and has been instrumental in developing our customer service philosophy.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUM1O8eYZBwCQDbIAOWTfX61LkHepK2u5lciGS",
        status: "Active",
        startDate: new Date("2022-03-15"),
        departmentId: managementDept.id, // Ensure departmentId is set
      },
      {
        name: "Youssef Elshikh",
        position: "Barista",
        email: "youssef@example.com",
        phone: "(555) 456-7890",
        bio: "A certified coffee expert who has competed in national barista championships.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU6efWENo2d67hLNOqCoZRvUl9bTVEgQ4aYerP",
        status: "Active",
        startDate: new Date("2022-05-22"),
        departmentId: baristaDept.id, // Ensure departmentId is set
      },
      {
        name: "Ramy Nasr",
        position: "Kitchen Chief",
        email: "ramy@example.com",
        phone: "(555) 567-8901",
        bio: "Chef Ramy creates our seasonal menu and ensures the highest quality in every dish that leaves our kitchen.",
        status: "Active",
        startDate: new Date("2022-08-05"),
        departmentId: serviceDept.id, // Ensure departmentId is set
      },
      {
        name: "Abdelrahman Celia",
        position: "Captain",
        email: "abdelrahman@example.com",
        phone: "(555) 678-9012",
        bio: "Abdelrahman leads our front-of-house team with a warm, welcoming approach to service.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUD8o8ya8kblqoPpiQXIkLS5TeJgH8YhCayv6E",
        status: "Active",
        startDate: new Date("2022-11-30"),
        departmentId: serviceDept.id, // Ensure departmentId is set
      },
      {
        name: "Mariam",
        position: "Captain",
        email: "mariam@example.com",
        phone: "(555) 789-0123",
        bio: "Known for remembering regular customers' orders and making everyone feel at home.",
        status: "On Leave",
        startDate: new Date("2023-01-10"),
        departmentId: serviceDept.id, // Ensure departmentId is set
      },
    ];

    // Seed employees
    for (const employee of employees) {
      await prisma.employee.upsert({
        where: { email: employee.email! }, // Ensure email is provided
        update: {},
        create: employee,
      });
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
