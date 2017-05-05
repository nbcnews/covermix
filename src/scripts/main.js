var articles;

$('.question-step button').on('click', function(){
  var el = $(this)
  var questionParent = el.parents('.question-step')
  var title = questionParent.find('h2').text()
  console.log('title', title)
  //var title = $('h2', questionStep).text();
  var selectedButtonText = el.text();
  var selectedTags = el.attr('data-target-tags')

  $('#custom-sentence').append('<p>'+title + ' ' + selectedButtonText.toLowerCase()+'</p>')

  $('#tags').append(selectedTags + ' + ')

  questionParent.find('button').attr('disabled','disabled');

  var taggedArticles = findTaggedArticles(selectedTags);

  $('#relevant-articles').append('<code>'+JSON.stringify(taggedArticles)+'</code>')

  $('#article-count').text(taggedArticles.length + ' relevant articles')
})

articles = [
  {
    title: "Cat Bites Dog"
    ,tags: ['2m', 'cute', 'video', 'notrump']
  }
  ,{
    title: "Trump Bites Dog"
    ,tags: ['5m', 'trump', 'article']
  }
  ,{
    title: "Watch This 24hr Cat Livestream"
    ,tags: ['60m+', 'cute', 'notrump']
  }
]

function findTaggedArticles(tag) {
  var relevantArticles = []
  articles.forEach(function(article){
    var tags = article.tags
    if(_.includes(tags, tag)) {
      relevantArticles.push(article)
    }
  })
  return relevantArticles
}
