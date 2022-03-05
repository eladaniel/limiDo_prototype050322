$(document).ready(function () {
  
        $.ajax({
            method: "GET",
            url: "Handlers/Handler.ashx",
            data: { Action: "getallsolutions" } //שליחת שם הפעולה שתתבצע בהנדלר - שליפת כל הפתרונות
        })
            .done(function (data) { //ברגע שהפעולה הסתיימה   
                obj = JSON.parse(data);    //המרת המחרוזת שחזרה למשתנה מסוג ג'ייסון
                var result = "";          //משתנה להדפסת כל שמות המשחקים
                //לולאה העוברת על כל התוצאות שהתקבלו ומסדרת אותן בשורות 
                for (i = 0; i < obj.Table.length; i++) {
                    result += `<div class="box">
<div class="title">${obj.Table[i].solution}</div>
<div class="tags">tags</div></div>`;
                }
                //הצגת התוצאה שהתקבלה בדיב המוגדר
                $("#Feedbacklbl").html(result);
            })
            .fail(function (error) { //במצב של שגיאה  
                console.log("error");
                console.log(error.statusText);
            })

    //הפונקציה המבצעת בלחיצה על הכפתור
    $("#solutionBTM").click(function () {
        //השנת הטקסט מתיבת הטקסט לתוך משתנה
        var solutionText = $("#userSolutionTxt").val();
        //מאפס את סימוני הצ'קבוקסים
        $('input:checkbox[name=CBG]:checked').attr('checked', false);

    $.ajax({
        method: "POST",
        url: "Handlers/Handler.ashx",
        data: { Action: "searchsolution", solutionName: solutionText } //שליחת שם הפעולה שתתבצע בהנדלר - שליפת הפתרון לפי שם הפתרון
    })
        .done(function (data)
        { //ברגע שהפעולה הסתיימה
            if (data == "לא נמצא פיתרון")
            {  
                $("#Feedbacklbl").html("לא נמצאו פתרונות");
            }
            else
            {
                obj = JSON.parse(data);    //המרת המחרוזת שחזרה למשתנה מסוג ג'ייסון
                var result = "";          //משתנה להדפסת הפתרון שישלף
                //לולאה העוברת על כל התוצאות שהתקבלו ומסדרת אותן בשורות 
                for (i = 0; i < obj.Table.length; i++) {
                    result += `<div class="box">
<div class="title">${obj.Table[i].solution}</div>
<div class="tags">tags</div></div>`;
                }
                //הצגת התוצאה שהתקבלה בדיב המוגדר
                $("#Feedbacklbl").html(result);
            }
        })
        .fail(function (error) { //במצב של שגיאה  
            console.log("error");
            console.log(error.statusText);
        })
    });

    //הפונקציה המבצעת בלחיצה על צ'קבוקס כלשהו
    $(".checkBoxClass").click(function () {
        //מנקה את תיבת הטקסט מהחיפוש אם רשום בה
        $('#userSolutionTxt').val("");
        //לטובת בדיקות
        console.log("clicked")
        //משתנה מסוג מערך שיקבל לתוכו את הערכים מהצ'קבוקסים שסומנו
        var allCheckedValues = [];
        //פןנקציה המכניסה למערך את כל הערכים של הצ'קבוקסים שסומנו
        $('input:checkbox[name=CBG]:checked').each(function () {
            allCheckedValues.push($(this).val());
            
        })
        //לולאה שעוברת על כל המערך ומוסיפה את המילה "אנד" אחרי כל ערך (חוץ מהאחרון) כדי שיכתב בצורה תקינה בשאילתה
        for (var queary in allCheckedValues) {
            if (queary.valueOf() < (allCheckedValues.length -1)) { allCheckedValues[queary.valueOf()] += " AND "};
            //לטובת בדיקות
            /*console.log(allCheckedValues[queary.valueOf()] + " " + queary.valueOf());*/
        }
        //לטובת בדיקות
        console.log(allCheckedValues)
        //אם המערך גדול מ-0 תכניס את המילה "וור" לפני כל השרשור כדי שיתאים בשאילתה
        if (allCheckedValues.length > 0) {
            var CB3 = "where " + allCheckedValues.join("");
        }
        //אם אין ערכים לסינון לא צריך להגדיר את התנאי. ללא תנאי זה הדף קורס אם מסמנים צ'קבוקסים ומורידים סימון מכולם (קורס בהורדה של הסימון האחרון)
        else {
            var CB3 = "";
        }
        //לבדיקות
        console.log(CB3)

        $.ajax({
        method: "POST",
        url: "Handlers/Handler.ashx",
        data: { Action: "filtersolution", Allchecked: CB3 } //שליחת שם הפעולה שתתבצע בהנדלר - שליפת הפתרונות לפי הסינון
        })
            .done(function (data) { //ברגע שהפעולה הסתיימה
                console.log(data);
                if (data == "לא נמצא פיתרון") {
                    $("#Feedbacklbl").html("לא נמצאו פתרונות");
                }
                else {
                    obj = JSON.parse(data);    //המרת המחרוזת שחזרה למשתנה מסוג ג'ייסון
                    var result = "";          //משתנה להדפסת כל שמות המשחקים
                    //לולאה העוברת על כל התוצאות שהתקבלו ומסדרת אותן בשורות 
                    for (i = 0; i < obj.Table.length; i++) {
                        result += `<div class="box">
<div class="title">${obj.Table[i].solution}</div>
<div class="tags">tags</div></div>`;
                    }
                    //הצגת התוצאה שהתקבלה בדיב המוגדר
                    $("#Feedbacklbl").html(result);
                }
    });
    });
});
