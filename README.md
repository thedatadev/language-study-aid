# Language Study Aid / Language Learning Recommender

### NOTE: Currently the project is focused on Japanese language learners. Support for other languages to be added at a later date

## Description
An application to make developing proficient reading and listening skills in foreign languages easy for language learners. The application serves as a recommender engine for online text articles as well as videos that suit a learner's proficiency level.

## Motivation
Learning a foreign language has many benefits, and people do it for many different reasons - but it can be quite costly in terms of both time and money. Despite there being a plethora of source material on the web, sifting through them all to find resources which are 'the right level' is inconceivably time-consuming.

## Implementation
This project can be broken down into the following epics:
1. Proficiency classification
2. Building a corpus of resources

### Proficiency classification
Classifying resources according to predefined proficiency taxonomies (e.g. formal/official benchmarks of language proficiency such as JLPT and IELTS). This involves scanning the document of an article or the transcript of a video to determine the overall level of proficiency.

### Building a corpus of resources
There has to be a corpus of resources from which learners can access articles and videos. The type of corpus under consideration comprises of a repository of URLs which are provided by the language learners themselves. Learners can then compile these resources and share them with the greater online community.

## Future work
The specification above pertains to the MVP. The following additional features would greatly improve the utility of this project:
1. Given text or audio artefacts produced by the learner, e.g. diary entries or speech recordings, assess the learner's language level based on these artefacts to improve the quality of recommended resources
2. To mitigate the effects of cold-start due to a small resource repository, utilise natural language generation techniques to generate short texts that suit the learner's language level
