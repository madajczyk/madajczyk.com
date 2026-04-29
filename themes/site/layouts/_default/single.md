{{- with .Title -}}# {{ . }}

{{ end -}}
{{- with .Description -}}> {{ . }}

{{ end -}}
{{- with .Date -}}Published: {{ .Format "January 2, 2006" }}

{{ end -}}
{{- with .Params.tags -}}Tags: {{ delimit . ", " }}

{{ end -}}
---

{{ .RawContent -}}
