<%*
moment.locale("gb")
const thisWeek = window.moment(tp.file.title, "YYYY-&&-&W WW");
const weekOfMonth = Math.ceil((window.moment(tp.file.title, "YYYY-&&-&W WW").date() + 6) / 7)
const startOfWeek = thisWeek.startOf('week').format("MM.DD")
const endOfWeek = thisWeek.endOf('week').format("MM.DD")
-%>
---
tags:
  - dailies
command: cmd+alt+r
date: <% tp.file.creation_date() %>
---
<< [[<% tp.date.now("YYYY-[W]ww", -7) %>|Last Week]] | [[<% tp.date.now("YYYY-[W]ww", +7) %>|Next Week]] | >>

### Week <% weekOfMonth %>  of  <% tp.date.now("MMM") %> (<% startOfWeek %>  ~ <% endOfWeek %>)

-tx-

| type    | Mon | Tue | Wed | Thur | Fri |
| :------- | :-- | :-- | :-- | :--- | :-- |
| Work     | -   | -   | -   | -    | -   |
|          | -   | -   | -   | -    | -   |
|          | -   | -   | -   | -    | -   |
| Deploy   | -   | -   | -   | -    | -   |
|          | -   | -   | -   | -    | -   |
|          | -   | -   | -   | -    | -   |
| Research | -   | -   | -   | -    | -   |
|          | -   | -   | -   | -    | -   |
|          | -   | -   | -   | -    | -   |
| Study    | -   | -   | -   | -    | -   |
|          | -   | -   | -   | -    | -   |
|          | -   | -   | -   | -    | -   |

