# Practical AWS CDK

こちらのブログで勉強した際のコードをまとめています。<br>
すごく勉強になります。
- [実践！AWS CDK](https://dev.classmethod.jp/articles/cdk-practice-1-introduction/)

## memo

```
# メタデータをCFNテンプレートに出力しない
cdk synth --path-metadata false
cdk synth --no-path-metadata
cdk deploy --path-metadata false
cdk deploy --no-path-metadata

# Version reportingをオフにするオプション（本ディレクトリは設定ファイルで無効済み）
--no-version-reporting
```