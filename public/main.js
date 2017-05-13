$('.delete').click(function(){
    var target = $(this);
    var id = target.attr("data-id");

    $(target).parent().parent().hide();

    fetch('recipes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id
      })
    })
});

$('.update').click(function(){
    var target = $(this);
    var id = target.attr('data-id');
    console.log("#updateRecipe" + id);
    var recipe = $("#updateRecipe" + id).val();
    var ingredients = $("#updateIngredients" + id).val();
    console.log(recipe);
    console.log(ingredients);
    fetch('recipes', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id,
        'recipe': recipe,
        'ingredients': ingredients
      })
    })
});
