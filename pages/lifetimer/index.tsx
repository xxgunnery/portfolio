import { Box, Button, ColorModeScript, Flex, GridItem, Heading, Image, Link, ListItem, SimpleGrid, UnorderedList, useColorMode, useMediaQuery, VStack } from "@chakra-ui/react";
import Head from "next/head";
import React from "react"
import jQuery from "jquery"
import { categories } from "../../public/lifetimer/lifetimerdata";
import Navbar from "../../components/Navbar"
import anychart from "anychart/index.js"
import AppBlurb from "../../components/AppBlurb"
import appData from "../../components/appData.json"

const Home = () => {

    const [areChartsLoaded, setAreChartsLoaded] = React.useState(false)

    if (typeof window !== "undefined") {
        jQuery(document).ready(
            function () {
                var typingTimer;
                var doneTypingInterval = 1000;

                jQuery('#pass').on('keyup', function () {
                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                });

                //on keydown, clear the countdown 
                jQuery('#pass').on('keydown', function () {
                    clearTimeout(typingTimer);
                });

                //user is "finished typing," do something
                function doneTyping() {
                    var userID = jQuery("#userid").val();
                    var userPass = jQuery("#pass").val();
                    jQuery.ajax({
                        type: "POST",
                        url: 'login.php',
                        data: {
                            functionname: "login",
                            user: userID,
                            pass: userPass
                        },
                        success: function (data) {
                            console.log(data);
                            console.log(data == "BAD");
                            if (data == "BAD") {
                                console.log("BAD AUTHENTICATION");
                                jQuery("#check").attr("src", "/lifetimer/defense.png");
                            } else {
                                jQuery("#check").attr("src", "/lifetimer/check.png");
                            }
                        },
                        failure: function () {
                            console.log("Error!");
                        }
                    });
                }

                if (jQuery(document).width() < 768) {
                    jQuery("#categoryChart").css("display", "none");
                    jQuery("#subCategoryChart").css("display", "none");
                }

                let numIterations = 0;
                let categoryNames = [];
                let subcategoryNames = [];
                let subsubcategoryNames = [];
                let categoryValues = [];
                let subcategoryValues = [];
                let subsubcategoryValues = [];

                function drawPie(data, id, title) {

                    // create the chart
                    var chart = anychart.pie();
                    // set the chart title
                    chart.title(title);

                    // add the data
                    chart.data(data);
                    // display the chart in the container
                    chart.container(id);
                    chart.draw();
                    // create the chart
                    var chart = anychart.pie();
                }

                var alertNum = 0;
                jQuery(document).on("click", "#edit", function () {
                    if (jQuery("#edit").text() == "EDITING") {
                        jQuery("#edit").css("border-width", "1px");
                        jQuery("#edit").css("background-color", "#F44336");
                        jQuery("#edit").text("EDIT");
                        //clearInterval(timeout2);
                    } else {
                        jQuery("#edit").css("border-width", "4px");
                        jQuery("#edit").text("EDITING");
                        let timeout2 = setInterval(function () {
                            if (alertNum % 2 > 0) {
                                jQuery("#edit").css("background-color", "#E57373");
                            } else {
                                jQuery("#edit").css("background-color", "#F44336");
                            }
                            alertNum = alertNum + 1;
                        }, 750);
                    }
                    jQuery(".hiddenMenu").css("display", "flex");
                });

                jQuery(document).on("click", "#signup",
                    function () {

                        var doneTypingInterval = 3000;

                        jQuery("#signupdiv").css("display", "block");
                        jQuery('#passSignup').on('keyup', function () {
                            clearTimeout(typingTimer);
                            typingTimer = setTimeout(doneTyping, doneTypingInterval);
                        });

                        //on keydown, clear the countdown 
                        jQuery('#passSignup').on('keydown', function () {
                            clearTimeout(typingTimer);
                        });

                        //user is "finished typing," do something
                        function doneTyping() {
                            var userID = jQuery("#useridSignup").val();
                            var userPass = jQuery("#passSignup").val();
                            jQuery.ajax({
                                type: "POST",
                                url: 'login.php',
                                data: {
                                    functionname: "signup",
                                    user: userID,
                                    pass: userPass
                                },
                                success: function (data) {
                                    if (data == "BAD") {
                                        console.log("BAD SIGNUP");
                                    } else {
                                        console.log(data);
                                        jQuery("#signupdiv").css("display", "none");
                                    }
                                },
                                failure: function () {
                                    console.log("Error!");
                                }
                            });
                        }
                    }
                );

                jQuery(document).on("click", ".dropdownText",
                    function () {
                        var id = jQuery(this).attr("id");
                        let selectedCategory = jQuery("#dropdownBoxCategory").text();
                        let selectedSubcategory = jQuery("#dropdownBoxSubcategory").text();
                        let selectedActivity = jQuery("#dropdownBoxSubsubcategory").text();
                        id = id.slice("dropdownBox".length);
                        let optionsID = "#dropdownOptions" + id;
                        let options = jQuery(optionsID);
                        jQuery(options).html("");
                        options.css("display", "block");
                        var username = jQuery("#userid").val();
                        getMyData(function (data) {
                            console.log(data);

                            if (jQuery("#edit").text() == "EDITING") {
                                let addChoice = "";
                                if (id == "Category") {
                                    for (var categories in data["Categories"]) {
                                        addChoice = "<div className='dropdownSegment'><div name='dropdownChoice'>" + categories + "</div><img className='editChoice' id='edit" + categories.replace(/\s/g, '') + "' src='/lifetimer/edit.png'></div>";
                                        let currentChoices = jQuery("#dropdownOptionsCategory").html();
                                        jQuery("#dropdownOptionsCategory").html(addChoice + currentChoices);
                                    }
                                    jQuery("#dropdownOptionsCategory").append("<div className='dropdownSegment'><input type='text' name='new' id='editField'><img src='/lifetimer/complete.png' className='doneEditing'></div>");
                                } else if (id == "Subcategory") {
                                    for (var subCategories in data["Categories"][selectedCategory]["Subcategories"]) {
                                        addChoice = "<div className='dropdownSegment'><div name='dropdownChoice'>" + subCategories + "</div><img className='editChoice' id='edit" + subCategories.replace(/\s/g, '') + "' src='/lifetimer/edit.png'></div>";
                                        let currentChoices = jQuery("#dropdownOptionsSubcategory").html();
                                        jQuery("#dropdownOptionsSubcategory").html(addChoice + currentChoices);
                                    }
                                    jQuery("#dropdownOptionsSubcategory").append("<div className='dropdownSegment'><input type='text' name='new' id='editField'><img src='/lifetimer/complete.png' className='doneEditing'></div>");
                                } else if (id == "Subsubcategory") {
                                    for (var activity in data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"]) {
                                        addChoice = "<div className='dropdownSegment'><div name='dropdownChoice'>" + activity + "</div><img className='editChoice' id='edit" + activity.replace(/\s/g, '') + "' src='/lifetimer/edit.png'></div>";;
                                        let currentChoices = jQuery("#dropdownOptionsSubsubcategory").html();
                                        jQuery("#dropdownOptionsSubsubcategory").html(addChoice + currentChoices);
                                    }
                                    jQuery("#dropdownOptionsSubsubcategory").append("<div className='dropdownSegment'><input type='text' name='new' id='editField'><img src='/lifetimer/complete.png' className='doneEditing'></div>");
                                } else if (id == "Variations") {
                                    for (let x = 0; x < data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][selectedActivity]["Variations"].length; x++) {
                                        let variation = data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][selectedActivity]["Variations"][x];
                                        addChoice = "<div className='dropdownSegment'><div name='dropdownChoice'>" + variation + "</div><img className='editChoice' id='edit" + variation.replace(/\s/g, '') + "' src='/lifetimer/edit.png'></div>";
                                        let currentChoices = jQuery("#dropdownOptionsVariations").html();
                                        jQuery("#dropdownOptionsVariations").html(addChoice + currentChoices);
                                    }
                                    jQuery("#dropdownOptionsVariations").append("<div className='dropdownSegment'><input type='text' name='new' id='editField'><img src='/lifetimer/complete.png' className='doneEditing'></div>");
                                }
                            } else if (jQuery("#edit").text() == "EDIT") {
                                let addChoice = "";
                                if (id == "Category") {
                                    for (var categories in data["Categories"]) {
                                        let numCats = categories.length;
                                        addChoice = "<div className='dropdownSegment'><div name='dropdownChoice'>" + categories + "</div></div>";
                                        let currentChoices = jQuery("#dropdownOptionsCategory").html();
                                        jQuery("#dropdownOptionsCategory").html(addChoice + currentChoices);
                                    }
                                } else if (id == "Subcategory") {
                                    for (var subCategories in data["Categories"][selectedCategory]["Subcategories"]) {
                                        let numsubCats = subCategories.length;
                                        addChoice = "<div className='dropdownSegment'><div name='dropdownChoice'>" + subCategories + "</div></div>";
                                        let currentChoices = jQuery("#dropdownOptionsSubcategory").html();
                                        jQuery("#dropdownOptionsSubcategory").html(addChoice + currentChoices);
                                    }
                                } else if (id == "Subsubcategory") {
                                    for (var activity in data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"]) {
                                        addChoice = "<div className='dropdownSegment'><div name='dropdownChoice'>" + activity + "</div></div>";
                                        let currentChoices = jQuery("#dropdownOptionsSubsubcategory").html();
                                        jQuery("#dropdownOptionsSubsubcategory").html(addChoice + currentChoices);
                                    }
                                } else if (id == "Variations") {
                                    for (let x = 0; x < data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][selectedActivity]["Variations"].length; x++) {
                                        let variation = data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][selectedActivity]["Variations"][x];
                                        addChoice = "<div className='dropdownSegment'><div name='dropdownChoice'>" + variation + "</div></div>";
                                        let currentChoices = jQuery("#dropdownOptionsVariations").html();
                                        jQuery("#dropdownOptionsVariations").html(addChoice + currentChoices);
                                    }
                                }
                            }

                        });
                    }
                );
                jQuery(document).off('click', ".editChoice").on('click', ".editChoice",
                    function () {
                        let currentID = jQuery(this).attr("id");
                        let oldCat = jQuery(this).prev().text();
                        let newInput = "<input type='text' placeholder='" + oldCat + "' name='" + oldCat + "' id='editField'><img src='/lifetimer/complete.png' id='" + currentID + "' className='doneEditing'>";
                        console.log(newInput);
                        console.log(jQuery(currentID));
                        console.log(currentID);
                        jQuery("#" + currentID).parent().html(newInput);
                    });
                jQuery(document).off('click', '.doneEditing').on('click', '.doneEditing',
                    function () {
                        let newName = jQuery('#editField').val();
                        let username = jQuery('#userid').val();
                        let oldCat = jQuery('#editField').attr("name");
                        //get document data - name of clicked choice, dropdown box, options container
                        var id = jQuery(this).parent().parent().parent().attr("id");
                        var id2 = jQuery(this).attr("id");
                        id = id.slice("dropdown".length);
                        jQuery(this).parent().html("<div name='dropdownChoice'>" + newName + "</div><img className='editChoice' id='" + id2 + "' src='/lifetimer/edit.png'>");
                        if (id == 'Category') {
                            var myRequest = [username, id, oldCat, newName];
                            jQuery.ajax({
                                type: "POST",
                                url: 'categoryListRewrite.php',
                                data: {
                                    functionname: id,
                                    dataset: JSON.stringify(myRequest)
                                },
                                success: function (data) {
                                    console.log(data);
                                },
                                failure: function () {
                                    console.log("Error!");
                                }
                            });
                        } else if (id == 'Subcategory') {
                            let category = jQuery('#dropdownBoxCategory').text();
                            var myRequest = [username, id, category, oldCat, newName];
                            jQuery.ajax({
                                type: "POST",
                                url: 'categoryListRewrite.php',
                                data: {
                                    functionname: id,
                                    dataset: JSON.stringify(myRequest)
                                },
                                success: function (data) {
                                    console.log(data);
                                },
                                failure: function () {
                                    console.log("Error!");
                                }
                            });
                        } else if (id == 'Subsubcategory') {
                            let category = jQuery('#dropdownBoxCategory').text();
                            let subcategory = jQuery('#dropdownBoxSubcategory').text();
                            var myRequest = [username, id, category, subcategory, oldCat, newName];
                            console.log(myRequest);
                            jQuery.ajax({
                                type: "POST",
                                url: 'categoryListRewrite.php',
                                data: {
                                    functionname: id,
                                    dataset: JSON.stringify(myRequest)
                                },
                                success: function (data) {
                                    console.log(data);
                                },
                                failure: function () {
                                    console.log("Error!");
                                }
                            });
                        } else if (id == 'Variations') {
                            let category = jQuery('#dropdownBoxCategory').text();
                            let subcategory = jQuery('#dropdownBoxSubcategory').text();
                            let activity = jQuery('#dropdownBoxSubsubcategory').text();
                            var myRequest = [username, id, category, subcategory, activity, oldCat, newName];
                            console.log(myRequest);
                            jQuery.ajax({
                                type: "POST",
                                url: 'categoryListRewrite.php',
                                data: {
                                    functionname: id,
                                    dataset: JSON.stringify(myRequest)
                                },
                                success: function (data) {
                                    console.log(data);
                                },
                                failure: function () {
                                    console.log("Error!");
                                }
                            });
                        }
                    });
                jQuery(document).on('click', "[name='dropdownChoice']",
                    function () {
                        //get document data - name of clicked choice, dropdown box, options container
                        var choicetext = jQuery(this).html();
                        var id = jQuery(this).parent().parent().parent().attr("id");
                        var id = id.slice("dropdown".length);
                        console.log(id);
                        let num = 3;
                        if (id == "Category") {
                            num = 1;
                            jQuery("#dropdownBoxSubcategory").text("Choose a subcategory");
                            jQuery("#dropdownBoxSubsubcategory").text("Choose an activity");
                            jQuery("#dropdownBoxVariations").text("Choose a variation");
                            jQuery("#timerContainer" + num).children(".timerDesc").text(choicetext);
                        } else if (id == "Subcategory") {
                            num = 2;
                            jQuery("#dropdownBoxSubsubcategory").text("Choose an activity");
                            jQuery("#dropdownBoxVariations").text("Choose a variation");
                            jQuery("#timerContainer" + num).children(".timerDesc").text(choicetext);
                        } else if (id == "Subsubcategory") {
                            jQuery("#dropdownBoxVariations").text("Choose a variation");
                            let username = jQuery('#userid').val();
                            let selectedCategory = jQuery("#dropdownBoxCategory").text();
                            let selectedSubcategory = jQuery("#dropdownBoxSubcategory").text();
                            getMyData(function (data) {
                                let numVariations = data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][choicetext]["Variations"].length;
                                let edit = jQuery("#edit").text();
                                if (numVariations > 0) {
                                    jQuery(".hiddenMenu").css("display", "flex");
                                    jQuery("#dropdownBoxVariations").html('<img src="/lifetimer/downarrow.png">Choose a variation');
                                } else if (edit != "EDITING") {
                                    jQuery(".hiddenMenu").css("display", "none");
                                } else {
                                    jQuery("#dropdownBoxVariations").html('<img src="/lifetimer/downarrow.png">Choose a variation');
                                }
                            });
                            jQuery("#timerContainer" + num).children(".timerDesc").text(choicetext);
                        } else if (id == "Variations") {
                            let selectedSubsubcategory = jQuery("#dropdownBoxSubsubcategory").text();
                            jQuery("#timerContainer" + num).children(".timerDesc").text(selectedSubsubcategory + " " + choicetext);
                        }

                        let boxID = "#dropdownBox" + id;
                        var dropdownbox = jQuery(boxID);
                        let optionsID = "#dropdownOptions" + id;
                        var options = jQuery(optionsID);
                        //Change dropdownbox text to the choice and close the options container
                        dropdownbox.html('<img src="/lifetimer/downarrow.png">' + choicetext);
                        options.css("display", "none");
                        jQuery(this).parent().parent().html("");
                    });


                jQuery(document).on('click', "#play", function () {

                    function startTimer1() {
                        let id = "#time1"
                        var timeNow = new Date().getTime();
                        timeNow = timeNow / 1000;
                        var timePassed = timeNow - timeStart;
                        let hours = Math.trunc(timePassed / 3600);
                        timePassed = timePassed % 3600;
                        let minutes = Math.trunc(timePassed / 60);
                        let seconds = Math.trunc(timePassed % 60);
                        //@ts-ignore
                        hours = hours < 10 ? "0" + hours : hours;
                        //@ts-ignore
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        //@ts-ignore
                        seconds = seconds < 10 ? "0" + seconds : seconds;
                        let currentTime = hours + ":" + minutes + ":" + seconds;
                        jQuery(id).html(currentTime);
                    }
                    function startTimer2() {
                        let id = "#time2"
                        var timeNow = new Date().getTime();
                        timeNow = timeNow / 1000;
                        var timePassed = timeNow - timeStart;
                        let hours = Math.trunc(timePassed / 3600);
                        timePassed = timePassed % 3600;
                        let minutes = Math.trunc(timePassed / 60);
                        let seconds = Math.trunc(timePassed % 60);
                        //@ts-ignore
                        hours = hours < 10 ? "0" + hours : hours;
                        //@ts-ignore
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        //@ts-ignore
                        seconds = seconds < 10 ? "0" + seconds : seconds;
                        let currentTime = hours + ":" + minutes + ":" + seconds;
                        jQuery(id).html(currentTime);
                    }
                    function startTimer3() {
                        let id = "#time3"
                        var timeNow = new Date().getTime();
                        timeNow = timeNow / 1000;
                        var timePassed = timeNow - timeStart;
                        let hours = Math.trunc(timePassed / 3600);
                        timePassed = timePassed % 3600;
                        let minutes = Math.trunc(timePassed / 60);
                        let seconds = Math.trunc(timePassed % 60);
                        //@ts-ignore
                        hours = hours < 10 ? "0" + hours : hours;
                        //@ts-ignore
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        //@ts-ignore
                        seconds = seconds < 10 ? "0" + seconds : seconds;
                        let currentTime = hours + ":" + minutes + ":" + seconds;
                        jQuery(id).html(currentTime);
                    }

                    var timeStart = new Date().getTime();
                    timeStart = timeStart / 1000;

                    var timerStartDate = String(new Date().getMonth() + 1) + "/" + String(new Date().getDate()) + "/" + String(new Date().getFullYear());
                    var hoursStart = new Date().getHours();
                    var ampmStart = "AM";
                    if (new Date().getHours() > 12) {
                        hoursStart = hoursStart - 12;
                        ampmStart = "PM";
                    } else if (new Date().getHours() == 12) {
                        ampmStart = "PM";
                    }
                    var timerStartTime = String(hoursStart) + ":" + String(new Date().getMinutes()) + ":" + String(new Date().getSeconds() + ampmStart);
                    console.log(timerStartTime);

                    var dayTimePause = jQuery("#time1").text();
                    var sessionTimePause = jQuery("#time2").text();
                    var activityTimePause = jQuery("#time3").text();

                    if (dayTimePause != "00:00:00") {
                        let hours = activityTimePause.substring(0, 2);
                        let minutes = activityTimePause.substring(3, 5)
                        let seconds = activityTimePause.substring(6, 8);
                        hours = parseInt(hours, 10);
                        minutes = parseInt(minutes, 10);
                        seconds = parseInt(seconds, 10);
                        dayTimePause = seconds + (60 * minutes) + (60 * 60 * hours);
                    } else {
                        dayTimePause = 0;
                    }
                    if (sessionTimePause != "00:00:00") {
                        let hours = sessionTimePause.substring(0, 2);
                        let minutes = sessionTimePause.substring(3, 5)
                        let seconds = sessionTimePause.substring(6, 8);
                        hours = parseInt(hours, 10);
                        minutes = parseInt(minutes, 10);
                        seconds = parseInt(seconds, 10);
                        sessionTimePause = seconds + (60 * minutes) + (60 * 60 * hours);
                    } else {
                        sessionTimePause = 0;
                    }
                    if (activityTimePause != "00:00:00") {
                        let hours = activityTimePause.substring(0, 2);
                        let minutes = activityTimePause.substring(3, 5)
                        let seconds = activityTimePause.substring(6, 8);
                        hours = parseInt(hours, 10);
                        minutes = parseInt(minutes, 10);
                        seconds = parseInt(seconds, 10);
                        activityTimePause = seconds + (60 * minutes) + (60 * 60 * hours);
                        timeStart = timeStart - activityTimePause;
                        var timerStart1 = setInterval(startTimer1, 1000);
                        var timerStart2 = setInterval(startTimer2, 1000);
                        var timerStart3 = setInterval(startTimer3, 1000);
                    } else {
                        activityTimePause = 0;
                        var timerStart1 = setInterval(startTimer1, 1000);
                        var timerStart2 = setInterval(startTimer2, 1000);
                        var timerStart3 = setInterval(startTimer3, 1000);
                    }

                    jQuery(document).on('click', '#pause', function () {
                        clearInterval(timerStart1);
                        clearInterval(timerStart2);
                        clearInterval(timerStart3);
                    });

                    jQuery(document).off("click", "#save").on('click', '#save', function () {
                        clearInterval(timerStart1);
                        clearInterval(timerStart2);
                        clearInterval(timerStart3);

                        var field1Val = String(jQuery("#field1").val());
                        var field2Val = String(jQuery("#field2").val());
                        jQuery("#field1").val("");
                        jQuery("#field2").val("");

                        var timerEndDate = String(new Date().getMonth() + 1) + "/" + String(new Date().getDate()) + "/" + String(new Date().getFullYear());
                        var hoursEnd = new Date().getHours();
                        var ampmEnd = "AM";
                        if (new Date().getHours() > 12) {
                            hoursEnd = hoursEnd - 12;
                            ampmEnd = "PM";
                        } else if (new Date().getHours() == 12) {
                            ampmEnd = "PM";
                        }
                        var timerEndTime = String(hoursEnd) + ":" + String(new Date().getMinutes()) + ":" + String(new Date().getSeconds() + ampmEnd);
                        console.log(timerEndTime);

                        numIterations += 1;
                        var myPie1 = [];
                        var myPie2 = [];
                        var myPie3 = [];
                        var myPie1X = [];
                        var myPie2X = [];
                        var myPie3X = [];
                        let categoryNames2 = [];
                        let subcategoryNames2 = [];
                        let subsubcategoryNames2 = [];
                        let categoryValues2 = [];
                        let subcategoryValues2 = [];
                        let subsubcategoryValues2 = [];

                        var dayTimeSave = jQuery("#time1").text();
                        var sessionTimeSave = jQuery("#time2").text();
                        var activityTimeSave = jQuery("#time3").text();
                        if (dayTimeSave != "00:00:00") {
                            let hours = activityTimeSave.substring(0, 2);
                            let minutes = activityTimeSave.substring(3, 5)
                            let seconds = activityTimeSave.substring(6, 8);
                            hours = parseInt(hours, 10);
                            minutes = parseInt(minutes, 10);
                            seconds = parseInt(seconds, 10);

                            dayTimeSave = seconds + (60 * minutes) + (60 * 60 * hours);
                        } else {
                            dayTimeSave = 0;
                        }
                        if (sessionTimeSave != "00:00:00") {
                            let hours = sessionTimeSave.substring(0, 2);
                            let minutes = sessionTimeSave.substring(3, 5)
                            let seconds = sessionTimeSave.substring(6, 8);
                            hours = parseInt(hours, 10);
                            minutes = parseInt(minutes, 10);
                            seconds = parseInt(seconds, 10);

                            sessionTimeSave = seconds + (60 * minutes) + (60 * 60 * hours);
                        } else {
                            sessionTimeSave = 0;
                        }
                        if (activityTimeSave != "00:00:00") {
                            let hours = activityTimeSave.substring(0, 2);
                            let minutes = activityTimeSave.substring(3, 5)
                            let seconds = activityTimeSave.substring(6, 8);
                            hours = parseInt(hours, 10);
                            minutes = parseInt(minutes, 10);
                            seconds = parseInt(seconds, 10);

                            activityTimeSave = seconds + (60 * minutes) + (60 * 60 * hours);
                        } else {
                            activityTimeSave = 0;
                        }
                        let currentCat = jQuery("#time1").next().text();
                        let currentsubCat = jQuery("#time2").next().text();
                        let currentsubsubCat = jQuery("#time3").next().text();
                        let currentCat2 = currentCat;
                        let currentsubCat2 = currentsubCat;
                        let currentsubsubCat2 = currentsubsubCat;

                        let numAppendCat = 1;
                        let numAppendsubCat = 1;
                        let numAppendsubsubCat = 1;
                        for (let x = 0; x < categoryNames2.length; x++) {
                            if (categoryNames2[x].search(currentCat) != -1) {
                                dashLoc = categoryNames2[x].search("-");
                                let currentNum = categoryNames2[x].slice(dashLoc + 2);
                                currentNum = parseInt(currentNum, 10);
                                numAppendCat = numAppendCat + 1;
                            }
                        }

                        for (let x = 0; x < subcategoryNames2.length; x++) {
                            if (subcategoryNames2[x].search(currentsubCat) != -1) {
                                dashLoc = subcategoryNames2[x].search("-");
                                let currentNum = subcategoryNames2[x].slice(dashLoc + 2);
                                currentNum = parseInt(currentNum, 10);
                                numAppendsubCat = numAppendsubCat + 1;
                            }
                        }

                        // for (let x = 0; x < subsubcategoryNames.length; x++) {
                        //     if (subsubcategoryNames[x].search(currentsubsubCat) != -1) {
                        //         dashLoc = subsubcategoryNames[x].search("-");
                        //         currentNum = subsubcategoryNames[x].slice(dashLoc + 2);
                        //         currentNum = parseInt(currentNum, 10);
                        //         numAppendsubsubCat = numAppendsubsubCat + 1;
                        //     }
                        // }

                        if (categoryNames2.length == 0) {
                            currentCat = currentCat + " - 1";
                            currentsubCat = currentsubCat + " - 1";
                            currentsubsubCat = currentsubsubCat + " - 1";
                            categoryNames.push(currentCat);
                            subcategoryNames.push(currentsubCat);
                            subsubcategoryNames.push(currentsubsubCat);
                            categoryValues.push(dayTimeSave);
                            subcategoryValues.push(sessionTimeSave);
                            subsubcategoryValues.push(activityTimeSave);
                            categoryNames2.push(currentCat2);
                            subcategoryNames2.push(currentsubCat2);
                            subsubcategoryNames2.push(currentsubsubCat2);
                            categoryValues2.push(dayTimeSave);
                            subcategoryValues2.push(sessionTimeSave);
                            subsubcategoryValues2.push(activityTimeSave);
                        } else {
                            var lastCategory = categoryNames2[categoryNames2.length - 1];
                            var dashLoc = lastCategory.search("-");
                            lastCategory = lastCategory.slice(0, dashLoc - 1);
                            var lastsubCategory = subcategoryNames2[subcategoryNames2.length - 1];
                            var dashLoc = lastsubCategory.search("-");
                            lastsubCategory = lastsubCategory.slice(0, dashLoc - 1);
                            //currentsubCat = currentsubCat + " - " + numAppendsubCat.toString();
                            if ((currentCat == lastCategory) && (currentsubCat != lastsubCategory)) {
                                let lastVal = parseInt(categoryValues2[categoryValues2.length - 1], 10);
                                categoryValues2[categoryValues2.length - 1] = lastVal + dayTimeSave;
                                currentsubsubCat = currentsubsubCat + " - " + numAppendsubsubCat.toString();
                                subcategoryNames.push(currentsubCat);
                                subsubcategoryNames.push(currentsubsubCat);
                                subcategoryValues.push(sessionTimeSave);
                                subsubcategoryValues.push(activityTimeSave);
                                categoryNames2.push(currentCat2);
                                subcategoryNames2.push(currentsubCat2);
                                subsubcategoryNames2.push(currentsubsubCat2);
                                categoryValues2.push(dayTimeSave);
                                subcategoryValues2.push(sessionTimeSave);
                                subsubcategoryValues2.push(activityTimeSave);
                            } else if (currentsubCat == lastsubCategory && currentCat != lastCategory) {
                                let lastVal = parseInt(subcategoryValues2[subcategoryValues2.length - 1], 10);
                                subcategoryValues2[subcategoryValues2.length - 1] = lastVal + sessionTimeSave;
                                currentsubsubCat = currentsubsubCat + " - " + numAppendsubsubCat.toString();
                                subcategoryNames.push(currentCat);
                                subsubcategoryNames.push(currentsubsubCat);
                                categoryValues.push(dayTimeSave);
                                subsubcategoryValues.push(activityTimeSave);
                                categoryNames2.push(currentCat2);
                                subcategoryNames2.push(currentsubCat2);
                                subsubcategoryNames2.push(currentsubsubCat2);
                                categoryValues2.push(dayTimeSave);
                                subcategoryValues2.push(sessionTimeSave);
                                subsubcategoryValues2.push(activityTimeSave);
                            } else if (currentsubCat == lastsubCategory && currentCat == lastCategory) {
                                let lastVal = parseInt(categoryValues2[categoryValues2.length - 1], 10);
                                categoryValues[categoryValues2.length - 1] = lastVal + dayTimeSave;
                                lastVal = parseInt(subcategoryValues2[subcategoryValues2.length - 1], 10);
                                subcategoryValues[subcategoryValues2.length - 1] = lastVal + sessionTimeSave;
                                currentsubsubCat = currentsubsubCat + " - " + numAppendsubsubCat.toString();
                                subsubcategoryNames.push(currentsubsubCat);
                                subsubcategoryValues.push(activityTimeSave);
                                categoryNames2.push(currentCat2);
                                subcategoryNames2.push(currentsubCat2);
                                subsubcategoryNames2.push(currentsubsubCat2);
                                categoryValues2.push(dayTimeSave);
                                subcategoryValues2.push(sessionTimeSave);
                                subsubcategoryValues2.push(activityTimeSave);
                            } else {
                                currentCat = currentCat + " - " + numAppendCat.toString();
                                currentsubCat = currentsubCat + " - " + numAppendsubCat.toString();
                                currentsubsubCat = currentsubsubCat + " - " + numAppendsubsubCat.toString();
                                categoryNames2.push(currentCat2);
                                subcategoryNames2.push(currentsubCat2);
                                subsubcategoryNames2.push(currentsubsubCat2);
                                categoryValues2.push(dayTimeSave);
                                subcategoryValues2.push(sessionTimeSave);
                                subsubcategoryValues2.push(activityTimeSave);
                            }
                        }
                        for (let y = 0; y < categoryValues2.length; y++) {
                            if (y >= categoryValues2.length) {
                                let categoryName = categoryNames2[y];
                                let categoryValue = categoryValues2[y];
                                myPie1.push({
                                    x: categoryName, value: categoryValue
                                });
                            } else {
                                let categoryName = categoryNames2[y];
                                let categoryName2 = categoryNames2[y];
                                let categoryValue = categoryValues2[y];
                                let categoryValue2 = categoryValues2[y];
                                myPie1.push({
                                    x: categoryName, value: categoryValue
                                });
                                myPie1X.push({
                                    x: categoryName2, value: categoryValue2
                                });
                            }
                        }
                        for (let y = 0; y < subcategoryValues2.length; y++) {
                            if (y >= subcategoryValues2.length) {
                                let subcategoryName = subcategoryNames2[y];
                                let subcategoryValue = subcategoryValues2[y];
                                myPie2.push({
                                    x: subcategoryName, value: subcategoryValue
                                });
                            } else {
                                let subcategoryName = subcategoryNames2[y];
                                let subcategoryName2 = subcategoryNames2[y];
                                let subcategoryValue = subcategoryValues2[y];
                                let subcategoryValue2 = subcategoryValues2[y];
                                myPie2.push({
                                    x: subcategoryName, value: subcategoryValue
                                });
                                myPie2X.push({
                                    x: subcategoryName2, value: subcategoryValue2
                                });
                            }

                        }
                        for (let y = 0; y < subsubcategoryValues2.length; y++) {
                            if (y >= subsubcategoryValues2.length) {
                                let subsubcategoryName = subsubcategoryNames2[y];
                                let subsubcategoryValue = subsubcategoryValues2[y];
                                myPie3.push({
                                    x: subsubcategoryName, value: subsubcategoryValue
                                });
                            } else {
                                let subsubcategoryName = subsubcategoryNames2[y];
                                let subsubcategoryValue = subsubcategoryValues2[y];
                                let subsubcategoryName2 = subsubcategoryNames2[y];
                                let subsubcategoryValue2 = subsubcategoryValues2[y];
                                myPie3.push({
                                    x: subsubcategoryName, value: subsubcategoryValue
                                });
                                myPie3X.push({
                                    x: subsubcategoryName2, value: subsubcategoryValue2
                                });
                            }
                        }

                        jQuery("#categoryChart").html("");
                        drawPie(myPie1, "categoryChart", "Day Overview");
                        jQuery("#time1").text("00:00:00");
                        jQuery("#subCategoryChart").html("");
                        drawPie(myPie2, "subCategoryChart", "Sessions Overview");
                        jQuery("#time2").text("00:00:00");
                        jQuery("#subsubCategoryChart").html("");
                        drawPie(myPie3, "subsubCategoryChart", "Activities Overview");
                        jQuery("#time3").text("00:00:00");
                        var username = jQuery("#userid").val();
                        var myPies = [timerStartDate, timerStartTime, timerEndDate, timerEndTime, myPie1X[0]["x"], myPie1X[0]["value"], myPie2X[0]["x"], myPie2X[0]["value"], myPie3X[0]["x"], myPie3X[0]["value"], field1Val, field2Val, username];

                        setAreChartsLoaded(true);
                    });

                });

                function getMyData(handleData) {
                    handleData(categories)
                }
            }
        )
    }

    return (
        <VStack mt="5px" fontFamily="verdana">
            <Navbar />
            <AppBlurb howto={appData['LifeTimer'].HOWTO} title={appData['LifeTimer'].Title}/>
            <div className="pageContainer">
                <div className="appContainer">
                    <div className="chartContainer row">
                        <VStack w="100%">
                            <Flex h="350px" alignItems="center" justifyContent="center" border="1px solid black" w="100%" bg="white">
                                {
                                    !areChartsLoaded &&
                                    <Flex fontWeight="800">
                                        Your LifeTimer charts will appear here!
                                    </Flex>
                                }
                                {
                                    <Flex display={areChartsLoaded ? "flex" : "none"} h="100%">
                                        <div id="categoryChart" className="pieChart col-sm-4">

                                        </div>
                                        <div id="subCategoryChart" className="pieChart col-sm-4">

                                        </div>
                                        <div id="subsubCategoryChart" className="pieChart col-sm-4">

                                        </div>
                                    </Flex>
                                }

                            </Flex>
                        </VStack>
                    </div>
                    <div className="timerControls">
                        <div className="row justify-content-center align-items-center">
                            <div className="dropdown col-xs-3" id="dropdownCategory">
                                <div id="dropdownBoxCategory" className="dropdownText">
                                    <img src="/lifetimer/downarrow.png" />
                                    Choose a category
                                </div>
                                <div className="dropdownOptions" id="dropdownOptionsCategory">

                                </div>
                            </div>
                            <div className="dropdown col-xs-3" id="dropdownSubcategory">
                                <div id="dropdownBoxSubcategory" className="dropdownText">
                                    <img src="/lifetimer/downarrow.png" />
                                    Choose a subcategory
                                </div>
                                <div className="dropdownOptions" id="dropdownOptionsSubcategory">

                                </div>
                            </div>
                            <div className="dropdown col-xs-3" id="dropdownSubsubcategory">
                                <div id="dropdownBoxSubsubcategory" className="dropdownText"><img src="/lifetimer/downarrow.png" />Choose an activity</div>
                                <div className="dropdownOptions" id="dropdownOptionsSubsubcategory"></div>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center">
                            <div className="hiddenMenu col-xs-12">
                                <div className="dropdown" id="dropdownVariations">
                                    <div id="dropdownBoxVariations" className="dropdownText"><img src="/lifetimer/downarrow.png"></img>Choose a variation</div>
                                    <div className="dropdownOptions" id="dropdownOptionsVariations"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center">
                            <div className="tagField col-xs-6">
                                <input type="text" id="field1" />
                            </div>
                            <div className="tagField col-xs-6">
                                <input type="text" id="field2" />
                            </div>

                            <div id="edit">EDIT</div>
                        </div>
                    </div>
                    <Flex className="timerButtons" alignItems="center" justifyContent="center">
                        <img id="play" src="/lifetimer/play-button.png" />
                        <img id="pause" src="/lifetimer/pause-button.png" />
                        <img id="save" src="/lifetimer/save-button.png" />
                    </Flex>
                </div>
                <div className="timers row">
                    <div id="timerContainer1" className="timerContainer col-xs-4">
                        <div id="time1" className="timer">00:00:00</div>
                        <div className="timerDesc">Category</div>
                    </div>
                    <div id="timerContainer2" className="timerContainer col-xs-4">
                        <div id="time2" className="timer">00:00:00</div>
                        <div className="timerDesc">Subcategory</div>
                    </div>
                    <div id="timerContainer3" className="timerContainer col-xs-4">
                        <div id="time3" className="timer">00:00:00</div>
                        <div className="timerDesc">Activity</div>
                    </div>
                </div>
            </div>
        </VStack >
    )
}

export default Home
