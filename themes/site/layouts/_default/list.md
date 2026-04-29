# {{ .Title }}

{{- range .Pages }}
- [{{ .Title }}]({{ .RelPermalink }}index.md){{ with .Description }}: {{ . }}{{ end }}
{{- end }}
