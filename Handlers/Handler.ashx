<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using Newtonsoft.Json; //להוסיף את הNewtonsoft
using System.Data;
using System.Data.OleDb;
using System.Collections.Generic;

public class Handler : IHttpHandler
{
    //הגדרת האובייקט אסקיואל כמשתנה גלובלי כדי שנוכל לפנות אליו בכל חלקי הקוד ולקרוא לשיטה המתאימה בהתאם לשאילתה
    SQLClass mySql = new SQLClass();

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //קבלת הפעולה שאותה אנחנו רוצים לבצע               
        string Action = context.Request["Action"];

        switch (Action)
        {
            //פעולה - הצג את כל הפתרונות
            case "getallsolutions":
                //שאילתה - שליפה של כל הפתרונות בטעינת העמוד
                string AllSolutionsQuery = "select solution from SolutionsFilter";
                //קריאה לשיטה במחלקה עם השאילתה שנרצה
                DataSet mySQLAnswer = mySql.SQLSelect(AllSolutionsQuery);
                //אם קיימים פתרונות:
                if (mySQLAnswer.Tables[0].Rows.Count != 0)
                {
                    //המרת הטבלה שחזרה מהשליפה לג'ייסון    
                    string jsonAllSolution = JsonConvert.SerializeObject(mySQLAnswer);
                    //שליחת תשובה עם שמות הפתרונות    
                    context.Response.Write(jsonAllSolution);
                }
                //אם לא קיימים פתרונות:
                else
                {
                    context.Response.Write("noData");
                }

                break;
            //פעולה - הצגת פתרונות לפי סינון
            case "filtersolution":
                //הגדרת משתנה שיקבל אליו את המידע מהאג'קס
                string filterData = context.Request["Allchecked"];
                //שאילתה - שליפה של כל הפתרונות ושרשור של משתנה המכניס בתוכו את התנאי
                string filtersolutionQuery = "select solution from SolutionsFilter " + filterData;
                //קריאה לשיטה במחלקה עם השאילתה שנרצה
                DataSet userfiltersolution = mySql.SQLSelect(filtersolutionQuery);

                //אם קיימים פתרונות:
                if (userfiltersolution.Tables[0].Rows.Count != 0)
                {
                    //המרת הטבלה שחזרה מהשליפה לג'ייסון    
                    string jsonfiltersolution = JsonConvert.SerializeObject(userfiltersolution);
                    //שליחת תשובה עם שמות הפתרונות    
                    context.Response.Write(jsonfiltersolution);
                    //נשמר לטובת בדיקות
                    //context.Response.Write(filtersolutionQuery); 

                }
                //אם לא קיימים פתרונות:
                else
                {
                    context.Response.Write("לא נמצא פיתרון");
                }
                break;
            //פעולה - חיפוש פתרון
            case "searchsolution":
                //הגדרת משתנה שיקבל אליו את המידע מהאג'קס
                string solutionText = context.Request["solutionName"];
                //שאילתה - שליפה של הפתרון מטבלת הפתרונות כל עוד שם הפתרון הוא: (ערך המשתנה המוזן)
                string searchsolutionQuery = "select solution from SolutionsFilter where solution=('" + solutionText + "')";
                //קריאה לשיטה במחלקה עם השאילתה שנרצה
                DataSet usersolution = mySql.SQLSelect(searchsolutionQuery);
                //אם קיימים פתרונות:
                if (usersolution.Tables[0].Rows.Count != 0)
                {
                    //המרת הטבלה שחזרה מהשליפה לג'ייסון    
                    string jsonsearchsolution = JsonConvert.SerializeObject(usersolution);
                    //שליחת תשובה עם שמות הפתרונות    
                    context.Response.Write(jsonsearchsolution);

                }
                //אם לא קיימים:
                else
                {
                    context.Response.Write("לא נמצא פיתרון");
                }
                break;
        }
    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }
}












