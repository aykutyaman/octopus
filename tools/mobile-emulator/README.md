# Başlamak İçin

## Gereksinimler

- iOS geliştirmek için OS X işletim sistemi
- Node.js 4.0 ve üzeri
- [watchman](https://facebook.github.io/watchman/docs/install.html)

## iOS Setup
- Xcode 7.0 veya üzeri

## Android Setup
- Android SDK ve Android Emülatör [yükle](https://facebook.github.io/react-native/docs/android-setup.html)

## Hızlı Başlangıç
`npm install -g react-native-cli`

### Android uygulamasını çalıştırmak için:
- `$ emulator -avd reactnative -qemu -m 512 -enable-kvm `. Bu komut android-sdk emülatörünü çalıştırır.
- ` $ cd ReactNativeEmulator `Yeni bir shell
- ` $ react-native start `
- ` $ cd ReactNativeEmulator `Yeni bir shell
- ` $ react-native run-android `

### Konsoldan Lokasyon Emülasyonu Yapma
```
$ telnet localhost 5554
...
Trying 127.0.0.1...
Connected to localhost.
...
geo fix 41.0689 29.0106
```

# Hatalar
- [The user limit on the total number of inotify watches was reached](https://github.com/facebook/watchman/issues/163) =
```
echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
watchman shutdown-server
```
