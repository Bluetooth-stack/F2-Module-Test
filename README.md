# F2-Module-Test
Student record with JSON file

* Displayed all data in  in the order of the JSON file by default.

* Name column has img of the student, and the full name. (first_name + lastname). 

* Passing attribute is a boolean in the json, which is displayed in table as either passing or failed. if passing is true shown passing, otherwise if the boolean is false, shown failed.

* A search bar which searches and updates the table data. It should filter out on the bases of first name, last name, and email. And shouldn't be case sensitive.

* The search functionality can work on handleChange or use the search button click event to show th eupdated table data.

* On the click of the sorting buttons sort the array - they do the following:
- Sort A->Z means ascending order of full name.
- Sort Z->A means descending order of full name.
- Sort by marks means ascending order of marks.
- Sort by passing means only show students who are passing in one table and failed students in another table.
- Sort by class means in the ascending order of class.

* On click sort by gender, you show 3 tables, first containing all female students, second containing all male students and third for other. 
