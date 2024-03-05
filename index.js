const fs = require("fs");
const csv = require("csv-parser");

// Specify the path to your CSV file
const csvFilePath = "users-data.csv";

const results = [];

const readableStream = fs.createReadStream(csvFilePath);

const writableStream = fs.createWriteStream(__dirname + "/results.txt");

readableStream
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })

  .on("error", (err) => {
    console.error("Error occurred while processing CSV file:", err);
  })
  .on("end", () => {
    let totalSalary = 0;
    let minimumAge = results[0].age;
    let maximumAge = results[0].age;

    const professionSalary = {};

    results.map((result) => {
      totalSalary = totalSalary + parseFloat(result.salary);

      if (result.age < minimumAge) {
        minimumAge = result.age;
      }
      if (result.age > maximumAge) {
        maximumAge = result.age;
      }

      professionSalary[result.profession] = {
        minimumSalary: parseFloat(result.salary),
        maximumSalary: parseFloat(result.salary),
      };
    });

    results.map((result) => {
      //result.profession => worker
      if (
        parseFloat(result.salary) <
        professionSalary[result.profession].minimumSalary
      ) {
        professionSalary[result.profession].minimumSalary = parseFloat(
          result.salary
        );
      }
      if (
        parseFloat(result.salary) >
        professionSalary[result.profession].maximumSalary
      ) {
        professionSalary[result.profession].maximumSalary = parseFloat(
          result.salary
        );
      }
    });

    console.log(professionSalary);

    const averageSalary = totalSalary / results.length;

    console.log("Total Salary:", totalSalary);
    console.log("Average Salary:", averageSalary);
    console.log("Minimum Age:", minimumAge);
    console.log("Maximum Age:", maximumAge);

    writableStream.write(professionSalary);
  });
