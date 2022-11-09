import { Box, Button, ColorModeScript, Flex, GridItem, Heading, Image, Link, ListItem, SimpleGrid, UnorderedList, useColorMode, useMediaQuery, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react"
import styles from "./index.module.css";
import jQuery from "jquery"
import { crockpotData } from "../../public/crockpot/ai_crockpotdata.js";
import Navbar from "../../components/Navbar";

const Home = () => {

    const [recipes, setRecipes] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);
    const [selectedRecipe, setSelectedRecipe] = React.useState(null)
    const [selectedRecipes, setSelectedRecipes] = React.useState([])
    const [recipeData, setRecipeData] = React.useState(null)
    const [showInfo, setShowInfo] = React.useState(false)

    function getCrockpotData(handleData) {
        handleData(crockpotData)
    }

    function closeGrid(event) {
        var info = jQuery(event.target).parent();
        info.html("");
        setShowInfo(false)
        var grid = jQuery("#checkboxGrid");
        grid.css("display", "block");

    }

    //create two functions to control the display of the dropdown menu
    function openOptions() {
        var options = jQuery("#dropdownOptions");
        if (options.css("display") == "block") {
            options.css("display", "none");
        } else {
            options.css("display", "block");
        }
    }

    //once results have been generated, swap between results pages
    function viewResults(event) {
        var returnedbutton = jQuery(event.target).text();
        if (returnedbutton == "View Shopping List") {
            jQuery("#aiResults").css("display", "block");
            jQuery("#aiResults2").css("display", "none");
        }
        else if (returnedbutton == "View Selected Recipes") {
            jQuery("#aiResults2").css("display", "block");
            jQuery("#aiResults").css("display", "none");
        }
    }


    //remove a selection from the queue
    function removeSelection(event) {
        var clickedrecipe = jQuery(event.target).parent().parent().parent()
        setRecipes(prevRecipes => [...prevRecipes, clickedrecipe.text()].sort())
        setSelectedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe != clickedrecipe.text()))
    }

    function parseRecipeData(data) {
        var addedunit;
        if ((data == "Servings") || (data == "Serving Size") || (data == "Calories")) {
            addedunit = "";
        } else if ((data == "Cholesterol") || (data == "Sodium")) {
            addedunit = "mg";
        } else if ((data == "Vitamin A") || (data == "Vitamin C") || (data == "Calcium") || (data == "Iron")) {
            addedunit = "%";
        } else {
            addedunit = "g";
        }
        return addedunit
    }

    function determineUnit(ingredient, ingredientunits) {
        for (let i = 0; i < ingredientunits.length; i++) {
            if (ingredient == ingredientunits[i][0]) {
                return ingredientunits[i][1]
            }
        }
    }

    async function viewNutritionData(event) {
        var selectedrecipe = jQuery(event.target).parent().text()
        setSelectedRecipe(selectedrecipe)

        var nutritiondata = [];
        var ingredientdata = [];
        var ingredientunits = [];
        var instructiondata = [];

        await getCrockpotData(function (data) {
            //get the recipes only
            let recipes = data.Recipes;
            let ingredients2 = data.Ingredients;

            //loop through JSON objects and store data into arrays which we can operate on
            if (nutritiondata.length == 0) {
                for (let i = 0; i < recipes.length; i++) {
                    var recipename = recipes[i].General["Name"];
                    if (selectedrecipe == recipename) {
                        var nutrition = recipes[i].Nutrition;
                        var ingredients = recipes[i].Ingredients;
                        var instructions = recipes[i].Recipe;
                        for (var nutrient in nutrition) {
                            nutritiondata.push([nutrient, nutrition[nutrient]])
                        }
                        for (var ingredient in ingredients) {
                            ingredientdata.push([ingredient, ingredients[ingredient]]);
                        }
                        for (var instruction in instructions) {
                            instructiondata.push([instruction, instructions[instruction]]);
                        }
                    }
                }
                for (let i = 0; i < ingredients2.length; i++) {
                    var ingredientname = ingredients2[i].Name;
                    var ingredientunit = ingredients2[i].Unit;
                    ingredientunits.push([ingredientname, ingredientunit]);
                }
            } else {
                nutritiondata = [];
                ingredientdata = [];
                ingredientunits = [];
                instructiondata = [];

                for (let i = 0; i < recipes.length; i++) {
                    var recipename = recipes[i].General["Name"];
                    if (selectedrecipe == recipename) {
                        var nutrition = recipes[i].Nutrition;
                        var ingredients = recipes[i].Ingredients;
                        for (var nutrient in nutrition) {
                            nutritiondata.push([nutrient, nutrition[nutrient]])
                        }
                        for (var ingredient in ingredients) {
                            ingredientdata.push([ingredient, ingredients[ingredient]]);
                        }
                        for (var instruction in instructions) {
                            instructiondata.push([instruction, instructions[instruction]]);
                        }
                    }
                }
                for (let i = 0; i < ingredients.length; i++) {
                    var ingredientname = ingredients[i].Name;
                    var ingredientunit = ingredients[i].Unit;
                    ingredientunits.push([ingredientname, ingredientunit]);
                }
            }
        });

        var grid = jQuery("#checkboxGrid");
        grid.css("display", "none");

        setShowInfo(true)

        var ingredients = jQuery("#checkboxInfoIngredients");
        var nutrition = jQuery("#checkboxInfoNutrition");
        var instructions = jQuery('#checkboxInfoInstructions');

        setRecipeData({ nutritiondata, ingredientdata, instructiondata, ingredientunits })
    }

    //Printelem an popup to print specific page content
    function PrintElem(elem, elem2) {
        Popup(jQuery(elem).html(), jQuery(elem2).html());
    }

    function Popup(data, data2) {
        //Open up a new window and print the document contents of the new window
        var mywindow = window.open('', 'new div', 'height=400,width=600');
        mywindow.document.write('<html><head><title>NLW Grocery List</title>');
        mywindow.document.write('<style> #aiResults { min-height: 900px; padding: 10px; font-family: Arial; display: block; margin-top: 10px; border-bottom: 1px solid black; page-break-after: always; } #aiResults div { font-size: 18px; font-weight: 600; }#aiResults li {font-size: 16px; font-weight: normal;} #aiResults section { page-break-inside: avoid;font-size: 18px; margin-left: 10px; border-bottom: 1px solid black;} #aiResults2 { padding: 10px; font-family: Arial; display: block; margin-top: 10px; border-bottom: 1px solid black; } #aiResults2 div { font-size: 18px; font-weight: 600; }#aiResults2 li {font-size: 16px; font-weight: normal;} #aiResults2 .recipeIngredients { page-break-inside: avoid; padding-left: 5px; padding-right: 5px; margin-bottom: 5px; border-top: 2px solid black; font-size: 18px;} #aiResults2 .recipeInstructions { page-break-inside: avoid; margin-left: 10px; margin-right: 10px; padding: 7.5px; background-color: #fafafa; border: 1px solid black; margin-bottom: 5px; font-size: 18px;} #aiResults2 .recipeContainer {page-break-inside: avoid;} #aiResults2 p { font-size: 16px; font-weight: normal;}</style>');
        mywindow.document.write('</head><body>');
        mywindow.document.write('<div style="text-align: center; font-weight: 600; font-size: 25px;">Thank you for choosing...</div><img src="http://www.nlwtestsite1982.biz/wp-content/uploads/2017/03/logo2.png" style="width: 300px; height: 50px; display: block; margin: auto;"/>');
        mywindow.document.write('<div id="aiResults">');
        mywindow.document.write(data);
        mywindow.document.write('</div>');
        mywindow.document.write('<div id="aiResults2">');
        mywindow.document.write(data2);
        mywindow.document.write('</div>');
        mywindow.document.write('</body></html>');

        //wait 1000 ms to print the window.
        setTimeout(function () {
            mywindow.print();
        }, 1000);

        //Wait 1500 ms to close the print window, so all data is read.
        setTimeout(function () {
            mywindow.close();
        }, 2000);


        return true;
    }

    var emailed = [];

    function RecipeContainer({ recipe }) {
        return (
            <Flex className="col-xs-12" alignItems="center" justifyContent="flex-start" w="100%" columnGap="10px">
                <input type="checkbox" name="recipe" value={recipe} />
                {recipe}
                <Image src="/images/information.png" onClick={(event) => viewNutritionData(event)} w="20px" h="20px" />
            </Flex>
        )
    }

    //run a function when a dropdown menu choice is clicked which displays information according to which selection is clicked
    async function handleDropdownChange(event) {
        setDisabled(true)
        //get document data - name of clicked choice, dropdown box, options container
        var choicetext = event.target.value
        var dropdownbox = jQuery("#dropdownBox");
        var options = jQuery("#dropdownOptions");

        //Change dropdownbox text to the choice and close the options container
        dropdownbox.html('<img src="/images/downarrow.png" onclick="openOptions(event)">' + choicetext);
        options.css("display", "none");

        //initialize the recipe name array
        let jsrecipes = [];

        //call the AJAX request, compares the category chosen in dropdown to the category in the list of recipes
        await getCrockpotData(function (data) {
            //get the recipes only
            let recipes = data.Recipes;

            //loop through the recipes, adding the names of the recipes to jsrecipes if they are in the selected category
            for (let i = 0; i < recipes.length; i++) {
                var recipecategory = recipes[i].General["Category"];
                if (recipecategory == choicetext) {
                    var recipename = recipes[i].General["Name"];
                    jsrecipes.push(recipename);
                }
                else if (choicetext == "All") {
                    var recipename = recipes[i].General["Name"];
                    jsrecipes.push(recipename);
                }
            }
        });

        //select the area where we are going to put recipes and clear it off
        var checkboxarea = jQuery("#checkboxGrid");
        var checkoverlay = jQuery("#checkboxOverlay");
        checkoverlay.css("display", "none");
        checkboxarea.css("display", "block");

        //Sort the jsrecipes list alphabetically
        jsrecipes = jsrecipes.sort();

        setRecipes(jsrecipes)
        setDisabled(false)
    }

    if (typeof window !== "undefined") {

        function aiResultsClear() {
            jQuery("#aiResults").empty();
        }
        //add a function to move the selected recipes to the query box and enable the generation box
        jQuery('#checkedToQuery').click(function (event) {
            event.stopPropagation();
            var checkedboxes = jQuery(':checked');

            if (checkedboxes.length === 0) {
                alert("No Selected Recipes");
            }
            else {
                //initialize variables
                var checkedrecipes = [];
                var addtoquerybox = "";
                //remove elements that have been selected from the list
                checkedboxes.parent().css("z-index", "-1");
                checkedboxes.parent().css("position", "absolute");
                checkedboxes.parent().animate({
                    bottom: "0px",
                    opacity: 0
                }, 1000, function () {
                    //animation complete
                    checkedboxes.prop('checked', false);
                });


                //loop througgh the selected recipes and add them to a list
                var recipes = document.getElementsByName('recipe');
                for (let i = 0; i < recipes.length; i++) {
                    //@ts-ignore
                    if (recipes[i].checked) {
                        //@ts-ignore
                        var recipename = recipes[i].value;
                        checkedrecipes.push(recipename);
                    }
                }

                //find the querybox on page and get the contents of it
                var querybox = jQuery('#queryBox');
                var queryboxcontents = querybox.find('p');

                let verifiedRecipes = []
                //loop through the checked recipes array
                for (let i = 0; i < checkedrecipes.length; i++) {
                    var selectedrecipe = checkedrecipes[i];
                    if (queryboxcontents.length > 0) {
                        //loop through the contents of the query box
                        for (let j = 0; j < queryboxcontents.length; j++) {
                            var selectedcontent = queryboxcontents[j].innerHTML;
                            //if the selected query box content is equal to the selected recipe
                            if (selectedcontent == selectedrecipe) {
                                alert('You selected a recipe which is already in the queue');
                                console.log("You selected a recipe which is already in the queue");
                                break;
                            } else {
                                //if the current compared element is not equal to the selected recipe...
                                if (j == (queryboxcontents.length - 1)) {
                                    setRecipes((prevRecipes) =>
                                        prevRecipes.filter((recipe) => recipe !== selectedrecipe)
                                    )
                                    verifiedRecipes.push(selectedrecipe)
                                }
                            }
                        }
                    } else {
                        setRecipes((prevRecipes) =>
                            prevRecipes.filter((recipe) => recipe !== selectedrecipe)
                        )
                        verifiedRecipes.push(selectedrecipe)
                    }
                }
                setSelectedRecipes(verifiedRecipes)
            }
        }
        );
        //add a function to move elements in query box to grocery list
        jQuery('#queryToList').click(function () {
            //initialize variables
            var selectedrecipes = [];
            var neededingredients = [];
            var allingredients = [];
            var recingred = [];
            var recsteps = [];

            var recipeslisted = jQuery("#queryBox div").length - 1;

            if (recipeslisted == 0) {
                alert("No meals have been selected yet!");
            } else {
                var topcontainer = jQuery('.aiListGenerator');
                var botcontainer = jQuery('.aiListContainer');
                topcontainer.css("display", "none");
                botcontainer.css("display", "block");

                var querybox = jQuery('#queryBox');
                var queryboxcontents = querybox.find('p');
                for (let i = 0; i < queryboxcontents.length; i++) {
                    var selectedcontent = queryboxcontents[i].innerHTML;
                    selectedrecipes.push(selectedcontent);
                }
                getCrockpotData(function (data) {
                    //get the recipes only
                    var recipes = data.Recipes;
                    var ingredients = data.Ingredients;

                    //loop through the recipes in the JSON file, adding the ingredients in the recipes to the neededingredients list if they are the same recipe as selected in the app
                    for (let i = 0; i < recipes.length; i++) {
                        var recipename = recipes[i].General["Name"];
                        for (let j = 0; j < selectedrecipes.length; j++) {
                            var selectedrecipe = selectedrecipes[j];
                            if (recipename == selectedrecipe) {
                                let recipeingredients = recipes[i].Ingredients;
                                let recipesteps = recipes[i].Recipe;
                                for (var ingredient in recipeingredients) {
                                    neededingredients.push([ingredient, recipeingredients[ingredient]]);
                                    recingred.push([ingredient, recipeingredients[ingredient], recipename])
                                }
                                for (var step in recipesteps) {
                                    recsteps.push([step, recipesteps[step], recipename]);
                                }
                            }
                        }
                    }
                    for (let i = 0; i < ingredients.length; i++) {
                        var ingredientname = ingredients[i].Name;
                        var ingredientquantity = ingredients[i].Quantity;
                        var ingredientunit = ingredients[i].Unit;
                        var ingredienttype = ingredients[i].Type;
                        allingredients.push([ingredientname, ingredientquantity, ingredientunit, ingredienttype]);
                    }

                });

                var currentdata = jQuery('#queryBox').html();
                if (currentdata != '') {
                    //initialize variables
                    var ingredientnames = [];
                    var updatedingredients = [];
                    var uniqueingredients = [];
                    var finalingredients = [];


                    //add ingredient quantities, set up units/type for the ingredients
                    for (let i = 0; i < neededingredients.length; i++) {
                        var ingredientname = neededingredients[i][0];
                        for (let j = 0; j < allingredients.length; j++) {
                            let selectedingredient = allingredients[j][0];
                            if (selectedingredient == ingredientname) {
                                allingredients[j][1] += neededingredients[i][1];
                                for (let k = 0; k < updatedingredients.length; k++) {
                                    if (selectedingredient == updatedingredients[k][0]) {
                                        updatedingredients.splice(k, 1);
                                    }
                                }
                                updatedingredients.push([selectedingredient, allingredients[j][1], allingredients[j][2], allingredients[j][3]]);
                                ingredientnames.push(selectedingredient);
                            }
                        }
                    }


                    //Work with our ingredient names array to delete duplicates and set up for input
                    for (let i = 0; i < ingredientnames.length; i++) {
                        var ingredient = ingredientnames[i];
                        if (jQuery.inArray(ingredient, uniqueingredients) === -1) {
                            uniqueingredients.push(ingredient);
                        }
                    }
                    for (let i = 0; i < uniqueingredients.length; i++) {
                        var ingredient = uniqueingredients[i];
                        finalingredients.push([ingredient, 0, "", ""]);
                    }
                    //input the data into the final ingredients array
                    for (let i = 0; i < updatedingredients.length; i++) {
                        var selectedname = updatedingredients[i][0];
                        for (let j = 0; j < finalingredients.length; j++) {
                            var uniquename = finalingredients[j][0];
                            if (uniquename == selectedname) {
                                let selectedquant = updatedingredients[i][1];
                                let selectedunit = updatedingredients[i][2];
                                let selectedtype = updatedingredients[i][3];
                                let uniquequant = finalingredients[j][1];
                                let uniqueunit = finalingredients[j][2];
                                let uniquetype = finalingredients[j][3];

                                uniquequant += selectedquant;
                                finalingredients[j][1] = uniquequant;
                                if (uniqueunit == "") {
                                    uniqueunit += selectedunit;
                                    finalingredients[j][2] = uniqueunit;
                                }
                                if (uniquetype == "") {
                                    uniquetype += selectedtype;
                                    finalingredients[j][3] = uniquetype;
                                }

                            }
                        }
                    }

                    //get all unique categories to display on page
                    var uniquecategories = [];
                    for (let i = 0; i < finalingredients.length; i++) {
                        var selectedcategory = finalingredients[i][3];
                        if (jQuery.inArray(selectedcategory, uniquecategories) === -1) {
                            uniquecategories.push(selectedcategory);
                        }
                    }

                    //display all unique categories on the page
                    for (let i = 0; i < uniquecategories.length; i++) {
                        var categoryid = uniquecategories[i].replace(/\s|\//g, '');
                        var categoryname = '<section id="' + categoryid + '">' + uniquecategories[i] + '</section>';
                        jQuery("#aiResults").append(categoryname);
                    }

                    //display all ingredients in their respective categories
                    var currentcategories = jQuery("#aiResults").find('section');

                    for (let i = 0; i < currentcategories.length; i++) {
                        var selectedcategory = currentcategories[i].innerHTML;
                        var selectedcategory = selectedcategory.replace(/\s|\//g, '');
                        for (let j = 0; j < finalingredients.length; j++) {
                            var ingredientcategory = finalingredients[j][3];
                            var ingredientcategory = ingredientcategory.replace(/\s|\//g, '');
                            if (ingredientcategory == selectedcategory) {
                                var ingredientname = finalingredients[j][0];
                                var ingredientquantity = finalingredients[j][1];
                                var ingredientunit = finalingredients[j][2];
                                var ingredienthtml = '<li>' + ingredientname + ' x ' + ingredientquantity + ' ' + ingredientunit + '</li>';
                                jQuery("#aiResults").find('#' + ingredientcategory).append(ingredienthtml).one();
                            }
                        }
                    }
                    //add the selected recipes to the page
                    for (let i = 0; i < selectedrecipes.length; i++) {
                        var recipehtml = "<div class='recipeContainer'>";
                        if (i == 0) {
                            recipehtml += '<div class="recipeHeader">Your Selected Meals:</div>';
                        }
                        recipehtml += ('<div>' + (i + 1) + ": " + selectedrecipes[i] + '</div>');
                        recipehtml += ("<section class='recipeIngredients'>Ingredients:");
                        for (let j = 0; j < recingred.length; j++) {
                            if (selectedrecipes[i] == recingred[j][2]) {
                                for (let k = 0; k < finalingredients.length; k++) {
                                    if (recingred[j][0] == finalingredients[k][0]) {
                                        recipehtml += ("<li>" + recingred[j][1] + " x " + finalingredients[k][2] + " " + recingred[j][0] + "</li>");
                                        break;
                                    }
                                }
                            }
                        }
                        recipehtml += "</section>";
                        recipehtml += "<section class='recipeInstructions'>Cooking Instructions:";
                        for (let k = 0; k < recsteps.length; k++) {
                            if (recsteps[k][2] == selectedrecipes[i]) {
                                recipehtml += ("<p>" + recsteps[k][0] + ": " + recsteps[k][1] + " " + "</p>")
                            }
                        }
                        recipehtml += "</section></div>";
                        jQuery("#aiResults2").append(recipehtml);
                    }

                    jQuery("#queryBox").empty();

                } else {
                    console.log('nothing in the query');
                }

            }
        });

        jQuery(window).click(
            function (event) {
                var options = jQuery("#dropdownOptions");
                if (event.target.className !== ("dropdownText" || "dropdownOptions")) {
                    options.css("display", "none");
                }
            }
        );
    }

    return (
        <VStack mt="5px" fontFamily="verdana">
            <Navbar />
            <div className="mainContainer">
                <div className="projectContainer">
                    <div className="bootstrap-iso">
                        <div className="container" id="aiAppContainer">
                            <div className="row aiListGenerator">
                                <div className="aiCategories col-lg-8 col-xs-12">
                                    <div className="aiElement20">
                                        <div className="aiElementTitle" id="chooseCategory">Choose a category: </div>
                                        <div className="dropdown">
                                            <div id="dropdownBox" className="dropdownText" onClick={() => openOptions()}><img src="/images/downarrow.png" onClick={() => openOptions()} />Protein type?</div>
                                            <div className="dropdownOptions" id="dropdownOptions">
                                                <Button disabled={disabled} onClick={(e) => handleDropdownChange(e)} value="All" className="dropdownChoice">All</Button>
                                                <Button disabled={disabled} onClick={(e) => handleDropdownChange(e)} value="Beef" className="dropdownChoice">Beef</Button>
                                                <Button disabled={disabled} onClick={(e) => handleDropdownChange(e)} value="Chicken" className="dropdownChoice">Chicken</Button>
                                                <Button disabled={disabled} onClick={(e) => handleDropdownChange(e)} value="Pork" className="dropdownChoice">Pork</Button>
                                                <Button disabled={disabled} onClick={(e) => handleDropdownChange(e)} value="Turkey" className="dropdownChoice">Turkey</Button>
                                                <Button disabled={disabled} onClick={(e) => handleDropdownChange(e)} value="Vegetarian" className="dropdownChoice">Vegetarian</Button>
                                                <Button disabled={disabled} onClick={(e) => handleDropdownChange(e)} value="Desserts" className="dropdownChoice">Desserts</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="aiElement80">
                                        <div className="checkboxes row" id="nlwCheckboxContainer">
                                            <div id="checkboxOverlay">
                                                <p>Meals which are available in your category appear here...</p>
                                            </div>
                                            {
                                                showInfo &&
                                                <div id="checkboxInfo">
                                                    <img src="/images/remove.png" id="closegrid" onClick={(e) => closeGrid(e)} />
                                                    <div className="col-xs-12" id="checkboxInfoTitle">
                                                        {selectedRecipe}
                                                    </div>
                                                    <div className="col-xs-12 col-lg-6 infoContainer">
                                                        <div className="infoStyle" id="checkboxInfoIngredients">
                                                            <p>
                                                                Ingredients:
                                                            </p>
                                                            {
                                                                recipeData.ingredientdata.map((ingredient) => {
                                                                    return (
                                                                        <li>
                                                                            {ingredient[0] + ": " + ingredient[1] + " " + determineUnit(ingredient[0], recipeData.ingredientunits)}
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12 col-lg-6 infoContainer">
                                                        <div className="infoStyle" id="checkboxInfoNutrition">
                                                            <p>
                                                                Nutrition Data:
                                                            </p>
                                                            {
                                                                recipeData.nutritiondata.map((nutrition) => {
                                                                    return (
                                                                        <div>
                                                                            {nutrition[0] + ": " + nutrition[1] + " " + parseRecipeData(nutrition[0])}
                                                                        </div>
                                                                    )

                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12 infoContainer">
                                                        <div className="infoStyle" id="checkboxInfoInstructions">
                                                            <p>
                                                                Cooking Instructions:
                                                            </p>
                                                            {
                                                                recipeData.instructiondata.map((instruction) => {
                                                                    return (
                                                                        <div>
                                                                            {instruction[0] + ": " + instruction[1]}
                                                                        </div>
                                                                    )

                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            }
                                            <div id="checkboxGrid">
                                                {
                                                    recipes.map((recipe) =>
                                                        <RecipeContainer recipe={recipe} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="buttons">
                                            <div id="checkedToQuery">Add to List</div>
                                            <a href="#selectedMeals" className="scrollArrow">
                                                <div>Your Selections</div>
                                                <img src="/images/scroll.png" />
                                            </a>
                                        </div>

                                    </div>
                                </div>
                                <div className="aiSelections col-lg-4 col-lg-offset-0 col-xs-12">
                                    <div className="aiElement80">
                                        <div id="queryBox" className="row">
                                            <div className="col-xs-12" id="selectedMeals">Selected Meals:</div>
                                            {
                                                selectedRecipes.map((recipe) =>
                                                    <div className="col-xs-12 queryBoxSelectionContainer">
                                                        <div className="row">
                                                            <div className="col-xs-1 queryBoxSelection">
                                                                <img className="rightArrow" src="/images/rightarrow.png" />
                                                            </div>
                                                            <div className="col-xs-10 queryBoxMeal">
                                                                <p>{recipe}</p>
                                                            </div>
                                                            <div className="col-xs-1 queryBoxRemove">
                                                                <img id="removeRecipe" src="/images/remove.png" onClick={(e) => removeSelection(e)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="aiElement20">
                                        <div className="buttons">
                                            <div id="queryToList">Create Shopping List</div>
                                            <a href="#chooseCategory" className="scrollArrow">
                                                <img src="/images/scroll2.png" />
                                                <div>Select More</div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="aiListContainer">
                                <div className="row">
                                    <div className="col-xs-12 resultsTitle">
                                        Your Shopping List:
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-lg-offset-2 buttons aiResultsButton">
                                        <div onClick={(e) => viewResults(e)}>View Shopping List</div>
                                        <div onClick={(e) => viewResults(e)}>View Selected Recipes</div>
                                        <div onClick={(e) => PrintElem('#aiResults', '#aiResults2')}>Print!</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-lg-8 col-lg-offset-2" id="aiResults">
                                        <div className="recipeHeader">Shopping List:</div>
                                    </div>
                                    <div className="col-xs-12 col-lg-8 col-lg-offset-2" id="aiResults2">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </VStack>
    )
}

export default Home
