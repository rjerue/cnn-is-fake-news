var watsonKey = require('../../IBM.js');
var alchemy_language = watsonKey.getKey();

module.exports = {
    watson: function(desired_url, callback) {

        var parameters = {
            extract: 'entities,keywords,concepts',
            max_items: 5,
            maxRetrieve: 10,
            url: desired_url
        };

        alchemy_language.combined(parameters, function(err, response) {

            var entities_array = [];
            var keywords_array = [];
            var concepts_array = [];

            if (err) {
                console.log('error:', err);
            } else {
                var entities = response.entities;
                var keywords = response.keywords;
                var concepts = response.concepts;

                for (var index in entities) {
                    if (entities[index].relevance < 0.5) {
                        break;
                    }
                    var JSONObject = {
                        text: entities[index].text,
                        relevance: entities[index].relevance
                    };
                    entities_array.push(JSONObject);
                }

                for (var index in keywords) {
                    if (keywords[index].relevance < 0.5) {
                        break;
                    }
                    var JSONObject = {
                        text: keywords[index].text,
                        relevance: keywords[index].relevance
                    };
                    keywords_array.push(JSONObject);
                }

                for (var index in concepts) {
                    if (concepts[index].relevance < 0.5 || index > 1) {
                        break;
                    }
                    var JSONObject = {
                        text: concepts[index].text,
                        relevance: concepts[index].relevance
                    };
                    concepts_array.push(JSONObject);
                }

                var results = {
                    entities: entities_array,
                    keywords: keywords_array,
                    concepts: concepts_array
                };
                console.log(JSON.stringify(results, null, 2));
								callback(results);
            }
        });
    }
}
