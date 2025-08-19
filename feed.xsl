<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>
          <xsl:value-of select="/rss/channel/title"/>
        </title>
        <meta charset="utf-8"/>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 700px; margin: 2em auto; line-height: 1.5; }
          h1 { font-size: 1.6em; margin-bottom: 1em; }
          ul { list-style: none; padding: 0; }
          li { margin-bottom: 1em; }
          a { text-decoration: none; color: #0066cc; }
          a:hover { text-decoration: underline; }
          small { color: #666; }
        </style>
      </head>
      <body>
        <h1>
          <xsl:value-of select="/rss/channel/title"/>
        </h1>
        <ul>
          <xsl:for-each select="/rss/channel/item">
            <li>
              <a href="{link}">
                <xsl:value-of select="title"/>
              </a>
              <br/>
              <small>
                <xsl:value-of select="pubDate"/>
              </small>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
