<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" encoding="UTF-8"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Test RSS</title>
      </head>
      <body>
        <h1>Test RSS Feed</h1>
        <ul>
          <xsl:for-each select="/rss/channel/item">
            <li>
              <xsl:value-of select="title"/>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
