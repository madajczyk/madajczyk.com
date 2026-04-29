{{- with .Title -}}# {{ . | htmlUnescape | safeHTML }}

{{ end -}}
{{- with .Description -}}> {{ . | htmlUnescape | safeHTML }}

{{ end -}}
{{- with .Date -}}Published: {{ .Format "January 2, 2006" }}

{{ end -}}
{{- with .Params.tags -}}Tags: {{ delimit . ", " }}

{{ end -}}
---
{{ .RawContent -}}
