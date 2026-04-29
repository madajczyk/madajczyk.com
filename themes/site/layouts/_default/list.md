# {{ .Title | htmlUnescape | safeHTML }}

{{ range .Pages -}}
- [{{ .Title | htmlUnescape | safeHTML }}]({{ .RelPermalink }}index.md){{ with .Description }}: {{ . | htmlUnescape | safeHTML }}{{ end }}
{{ end -}}
