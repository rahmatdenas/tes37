'use strict';

const BASE_TITLE = 'WikiSurau';

const KUMPULAN_KUERI_0 = {
  'general': `SELECT DISTINCT ?siteQid ?siteLabel ?provinsiQid ?provinsiLabel ?p131LokasiLabel ?tahunBerdiriMentah ?tahunPresisi
  WHERE {
    VALUES ?jenis { <PLACEHOLDER_JENIS> } 
    {
      <PLACEHOLDER_WILAYAH_1>
      ?p131Lokasi wdt:P131* ?provinsi .
      ?site wdt:P31 ?jenis ;
            wdt:P131 ?p131Lokasi .
    }
    UNION
    {
      <PLACEHOLDER_WILAYAH_2>
      ?site wdt:P31 ?jenis ;
            wdt:P131 ?p131Lokasi .
    }    
    OPTIONAL { 
      ?site p:P571 ?inceptionStmt .
      ?inceptionStmt psv:P571 ?inceptionNode .
      ?inceptionNode wikibase:timeValue ?tahunBerdiriMentah ;
                     wikibase:timePrecision ?tahunPresisi .
    }
    
    BIND(SUBSTR(STR(?site), 32) AS ?siteQid) .
    BIND(SUBSTR(STR(?provinsi), 32) AS ?provinsiQid) .
    
    SERVICE wikibase:label { bd:serviceParam wikibase:language "id". }
  }`,

  'pers': `SELECT DISTINCT ?siteQid ?siteLabel ?provinsiQid ?provinsiLabel ?p131LokasiLabel ?tahunBerdiriMentah ?tahunPresisi
  WHERE {
    VALUES ?jenis { <PLACEHOLDER_JENIS> } 

    {
     <PLACEHOLDER_WILAYAH_1>
      ?p131Lokasi wdt:P131* ?provinsi .
      ?site wdt:P31 ?jenis ;
            wdt:P159 ?kantor .
      ?kantor wdt:P131 ?p131Lokasi .
    }
    UNION
    {
      <PLACEHOLDER_WILAYAH_2>
      ?site wdt:P31 ?jenis ;
            wdt:P159 ?kantor .
      ?kantor wdt:P131 ?p131Lokasi .
    }
    
    OPTIONAL { 
      ?site p:P571 ?inceptionStmt .
      ?inceptionStmt psv:P571 ?inceptionNode .
      ?inceptionNode wikibase:timeValue ?tahunBerdiriMentah ;
                     wikibase:timePrecision ?tahunPresisi .
    }
    
    BIND(SUBSTR(STR(?site), 32) AS ?siteQid) .
    BIND(SUBSTR(STR(?provinsi), 32) AS ?provinsiQid) .
    
    SERVICE wikibase:label { bd:serviceParam wikibase:language "id". }
  }`,

  'publikasi': `SELECT DISTINCT ?siteQid ?siteLabel ?provinsiQid ?provinsiLabel ?p131LokasiLabel ?tahunBerdiriMentah ?tahunPresisi
  WHERE {
    VALUES ?jenis { <PLACEHOLDER_JENIS> } 

    {
     <PLACEHOLDER_WILAYAH_1>
      ?p131Lokasi wdt:P131* ?provinsi .
      ?site wdt:P31 ?jenis ;
            wdt:P291 ?terbitdi .
      ?terbitdi wdt:P131 ?p131Lokasi .
    }
    UNION
    {
      <PLACEHOLDER_WILAYAH_2>
      ?site wdt:P31 ?jenis ;
            wdt:P291 ?terbitdi .
      ?terbitdi wdt:P131 ?p131Lokasi .
    }
    
    OPTIONAL { 
      ?site p:P571 ?inceptionStmt .
      ?inceptionStmt psv:P571 ?inceptionNode .
      ?inceptionNode wikibase:timeValue ?tahunBerdiriMentah ;
                     wikibase:timePrecision ?tahunPresisi .
    }
    
    BIND(SUBSTR(STR(?site), 32) AS ?siteQid) .
    BIND(SUBSTR(STR(?provinsi), 32) AS ?provinsiQid) .
    
    SERVICE wikibase:label { bd:serviceParam wikibase:language "id". }
  }`,

  'fiksi': `SELECT DISTINCT ?siteQid ?siteLabel ?provinsiQid ?provinsiLabel ?p131LokasiLabel ?tahunBerdiriMentah ?tahunPresisi
  WHERE {
    VALUES ?jenis { <PLACEHOLDER_JENIS> } 

    {
     <PLACEHOLDER_WILAYAH_1>
      ?p131Lokasi wdt:P131* ?provinsi .
      ?site wdt:P31 ?jenis ;
            wdt:P840 ?latar .
      ?latar wdt:P131 ?p131Lokasi .
    }
    UNION
    {
      <PLACEHOLDER_WILAYAH_2>
      ?site wdt:P31 ?jenis ;
            wdt:P840 ?latar .
      ?latar wdt:P131 ?p131Lokasi .
    }
    
    OPTIONAL { 
      ?site p:P571 ?inceptionStmt .
      ?inceptionStmt psv:P571 ?inceptionNode .
      ?inceptionNode wikibase:timeValue ?tahunBerdiriMentah ;
                     wikibase:timePrecision ?tahunPresisi .
    }
    
    BIND(SUBSTR(STR(?site), 32) AS ?siteQid) .
    BIND(SUBSTR(STR(?provinsi), 32) AS ?provinsiQid) .
    
    SERVICE wikibase:label { bd:serviceParam wikibase:language "id". }
  }`,

'tokoh': `SELECT DISTINCT ?siteQid ?siteLabel ?provinsiQid ?provinsiLabel ?p131LokasiLabel ?tahunBerdiriMentah ?tahunPresisi
  WHERE {
    VALUES ?jenis { <PLACEHOLDER_JENIS> } 

    <PLACEHOLDER_WILAYAH_1>
    ?p131Lokasi wdt:P131* ?provinsi .
    ?site wdt:P31 ?jenis ;
          wdt:P19 ?lahir .
    ?lahir wdt:P131* ?p131Lokasi .
    
    # Menarik P569 (tanggal lahir) khusus untuk tokoh
    OPTIONAL { 
      ?site p:P569 ?inceptionStmt .
      ?inceptionStmt psv:P569 ?inceptionNode .
      ?inceptionNode wikibase:timeValue ?tahunBerdiriMentah ;
                     wikibase:timePrecision ?tahunPresisi .
    }
    
    BIND(SUBSTR(STR(?site), 32) AS ?siteQid) .
    BIND(SUBSTR(STR(?provinsi), 32) AS ?provinsiQid) .
    
    SERVICE wikibase:label { bd:serviceParam wikibase:language "id". }
  }`
};

const KUMPULAN_KUERI_1 = {
  'general': `SELECT DISTINCT ?siteQid ?coord WHERE {
    VALUES ?site { <PLACEHOLDER_QIDS> }
    ?site p:P625 ?coordStatement .
    ?coordStatement ps:P625 ?coord .
    FILTER NOT EXISTS { ?coordStatement pq:P518 ?x }
    BIND (SUBSTR(STR(?site), 32) AS ?siteQid) .
  }`,
  
  'pers': `SELECT DISTINCT ?siteQid ?coord WHERE {
    VALUES ?site { <PLACEHOLDER_QIDS> }
    ?site wdt:P159 ?kantor .
    ?kantor p:P625 ?coordStatement .
    ?coordStatement ps:P625 ?coord .
    FILTER NOT EXISTS { ?coordStatement pq:P518 ?x }
    BIND (SUBSTR(STR(?site), 32) AS ?siteQid) .
  }`,

  'publikasi': `SELECT DISTINCT ?siteQid ?coord WHERE {
    VALUES ?site { <PLACEHOLDER_QIDS> }
    ?site wdt:P291 ?terbitdi .
    ?terbitdi p:P625 ?coordStatement .
    ?coordStatement ps:P625 ?coord .
    FILTER NOT EXISTS { ?coordStatement pq:P518 ?x }
    BIND (SUBSTR(STR(?site), 32) AS ?siteQid) .
  }`,

  'fiksi': `SELECT DISTINCT ?siteQid ?coord WHERE {
    VALUES ?site { <PLACEHOLDER_QIDS> }
    ?site wdt:P840 ?latar .
    ?latar p:P625 ?coordStatement .
    ?coordStatement ps:P625 ?coord .
    FILTER NOT EXISTS { ?coordStatement pq:P518 ?x }
    BIND (SUBSTR(STR(?site), 32) AS ?siteQid) .
  }`,

  'tokoh': `SELECT DISTINCT ?siteQid ?coord WHERE {
    VALUES ?site { <PLACEHOLDER_QIDS> }
    ?site wdt:P19 ?lahir .
    ?lahir p:P625 ?coordStatement .
    ?coordStatement ps:P625 ?coord .
    FILTER NOT EXISTS { ?coordStatement pq:P518 ?x }
    BIND (SUBSTR(STR(?site), 32) AS ?siteQid) .
  }`
};
