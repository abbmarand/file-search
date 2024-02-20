import spacy
class texthandler:
    def __init__(self):
         self.nlp = spacy.load("en_core_web_sm")
         
    def remove_stop_words(self,text):
        doc = self.nlp(text)
        text_parts = [token.text for token in doc if not token.is_stop]
        return " ".join(text_parts)

    def split_sentences(self,text):
        doc = self.nlp(text)
        sentences = [sent.text for sent in doc.sents]
        return sentences

    def group_sentences_semantically(self, sentences, threshold):
        docs = [self.nlp(sentence) for sentence in sentences]
        segments = []

        start_idx = 0
        end_idx = 1
        segment = [sentences[start_idx]]
        while end_idx < len(docs):
            if docs[start_idx].similarity(docs[end_idx]) >= threshold:
                segment.append(str(docs[end_idx]))
            else:
                segments.append(" ".join(segment))
                start_idx = end_idx
                segment = [sentences[start_idx]]
            end_idx += 1


        if segment:
            segments.append(" ".join(segment))
        return segments


    def split_text(self, text):
        text_no_stop_words = self.remove_stop_words(text)
        sentences = self.split_sentences(text_no_stop_words)
        return self.group_sentences_semantically(sentences, 0.8)
    
    
dataa ="""
Ett medium är något som kan lagra, förmedla eller överföra information.

Bild, text, tal och ljud är de vanligaste verktygen vid förmedling via medierna och dessa engagerar enbart synsinnet och hörseln. Känselsinnet används i medieringssammanhang för brailleskrift eller braillebilder för människor med nedsatt syn eller blindhet. Vanliga medier är television, video, film, radio, musik-cd, tidningar, tidskrifter, böcker, datorspel, Internet, telefon m.m. Även exempelvis språk, matematik, lagstiftning, har abstrakta system och strukturer i sig som gör att de fungerar som verktyg, medel, medier, för kommunikation.

Ett massmedium är ett meddelelsemedel som samtidigt kan nå många människor, till exempel en tidning, radio, TV, Internet, eller en person som talar till många människor, exempelvis en programledare eller lärare.

Ett etermedium är en informationskanal som använder radiovågor, det vill säga radio och TV. Namnet kommer av att man i radioteknikens barndom trodde att radiovågorna förmedlades genom rymden av ett osynligt ämne som man kallade eter.

Multimedia kallas kombinationer av olika mediumtyper, främst interaktiva datortillämpningar där bild, text och ljud samverkar, till exempel interaktiva uppslagsverk eller läromedel på cd eller dvd, men även konstverk kan använda multimedier.

Interaktiva medier är sådana medier som mottagaren kan samverka med, styra eller förändra, till exempel datorspel, uppslagsverk som Wikipedia, Internet och interaktiv tv.
Definition och etymologi

Olika definitioner av funktionen medium har förekommit länge. En klassisk definition av mediehistorikern Marshall McLuhan lyder att medier fungerar som "utvidgningar eller förlängningar av våra kroppar". I Platons Staten liknar Platon omvärlden som skuggor vid en eldstad, och menar att alla sätt genom vilka man försöker fånga dessa skuggor med hjälp av något sorts medium ytterligare fjärmar oss från både uppdiktade liknelser och faktiska skuggor. Men framför allt från det som är det egentliga upphovet till deras mer eller mindre snedvridande funktioner som symboler och i sina egenskaper som medier. Den första att beskriva funktionsbeskrivningen eller fenomenet medium vid namn var Aristoteles, Platons lärjunge, som kallade dem "to metaxi" – grekiska för mellan, vilket översattes till latin med ordet medium.[1]

Begreppet medium i Sverige har använts från i betydelsen mellanliggande organ, kanal för kommunikation från 1500-talet. Suffixet -ium är besläktat med latinets -orius, -oria, -orium och indikerar att det finns ett innehåll, något inuti, en plats för.[2]
Medieutveckling

Jan Holmberg i sin skrift Medialitet i antologin Litteraturens offentligheter menar att människan verkar vara rädd för medier, på grund av att människan föreställer sig fulländad och att varje behov av ett medium i sig visar på människans tillkortakommande. Dock menar han även att formeln gäller att ju nyare mediet är, desto mer skrämmande är det, och ju äldre det är, desto mer har det trängts bort just som medium, och exemplifierar med elden som få människor idag skulle kalla för ett medium: "så länge ett medium är nytt framträder det som just ett medium. […] Det tycks som att mediernas kuslighet härrör från graden av synlighet i deras medialitet. Så kanske kunde vi omformulera formeln ovan: nya medier är inte kusliga för att de är nya, utan för att de så tydligt är medier och omvänt; ju äldre medium, desto mer bortträngt blir själva dess mediala egenskaper."[3] Det har gjort att, enligt Holmberg, bland annat boken har tappat sin medialitet och att människan därmed glömt bort vad boken egentligen är.[3]

Jay David Bolter och Richard Grusin myntade begreppet "remediation" – att så länge mediet är förhärskande förefaller det "genomskinligt", men blir synligt i och med intåget av nya medium och nya teknologien – såsom när skriften utmanades av fonografen och filmen. Ett nytt medium är begränsat i förhållande till det gamla, och det gamla försöker efterlikna det nya – vilket skapar en enighet mellan det gamla och det nya mediet. Dock omprövas ofta statusen på det gamla mediet när ett nytt medium introduceras, vilket bland annat har skett de gånger då bokens död proklamerats – både vid fonografens intåg och e- och ljudbokens.[4]
Språkrekommendation

I talspråkliga sammanhang förekommer ibland singularformen medie, men den formen anses av Språkrådet vara felaktig liksom motsvarande former för andra ord som slutar på -ium.[5] 
"""
textsplitter = texthandler()
ans = textsplitter.split_text(dataa)
i = 0
for string in ans:
    i+=1
    print(str(i) + string)
