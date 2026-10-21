---
title: "Nocturne - Custom Firmware and Companion App Ecosystem for Spotify Car Thing Hardware"
description: "An open-source custom firmware and companion app ecosystem that repurposes discontinued Spotify Car Thing hardware into a standalone Bluetooth media controller."
publishDate: "2024-09-19"
image:
  src: "../../assets/projects/art/nocturne.webp"
  alt: "Painterly artwork selected for the Nocturne project"
status: "Active Development"
focus: "Embedded Systems & Open Source"
repository: "https://github.com/usenocturne"
isFeatured: true
seo:
  title: "Nocturne: Custom Firmware for Spotify Car Thing"
  image:
    src: "../../assets/projects/nocturne/nocturne-1.png"
    alt: "Nocturne running on Spotify Car Thing hardware"
---

![Nocturne running on Spotify Car Thing hardware](../../assets/projects/nocturne/nocturne-1.png)

Nocturne is an open-source custom firmware and companion app ecosystem that repurposes the discontinued Spotify Car Thing into a standalone Bluetooth media controller. Built by a three-person engineering team, it replaces the stock firmware with a complete embedded Linux distribution, a real-time Rust system daemon, a touch-optimized web application running on the device, and native companion apps for iOS and Android. The project has more than 700 sponsors and a community of more than 1,700 members.

## Project History

Nocturne grew from a simple operating system replacement into a full firmware and companion app ecosystem. The earliest beta releases used a custom Debian 12 configuration on the Car Thing. A Raspberry Pi connected to the device over USB and acted as a network bridge, giving the system access to the Spotify API while the Car Thing handled the interface and media controls.

Version 3 marked a major architectural shift. The Debian base was replaced with a custom NixOS configuration, and Bluetooth tethering through a phone hotspot eliminated the Raspberry Pi requirement. This made setup substantially simpler and moved Nocturne from a hobbyist experiment toward a more polished platform.

The current version replaces NixOS with a custom Buildroot-based embedded Linux distribution and gives the team control over every layer of the operating system. A native Rust daemon manages device services, direct Bluetooth communication connects the Car Thing to companion apps, and the redesigned React 19 interface runs on-device. Wake-word detection, A/B over-the-air updates, and native mobile applications complete the current system.

## Architecture

The firmware is a custom Buildroot distribution targeting the Car Thing's ARM Cortex-A53 SoC, an Amlogic S905D2 with 512MB of RAM. It includes the Weston compositor, Chromium in kiosk mode, the BlueZ Bluetooth stack, SWUpdate for A/B updates, USB RNDIS gadget networking, and on-device ONNX inference for the "Hey Nocturne" wake word.

The system's central bridge is `nocturned`, a Rust daemon that manages WebSocket communication on port 5000, BlueZ device management, Spotify API proxying, update orchestration, and the device lifecycle. It runs alongside four other supervised services and connects the user interface to the underlying hardware and mobile applications.

The `nocturne-ui` application is a touch-optimized React 19 and Vite single-page application that runs inside Chromium. It provides Spotify playback control, Bluetooth pairing, hardware button mapping, swipe navigation, dynamic album art backgrounds, and over-the-air update flows. Native iOS and Android companion apps handle Bluetooth connectivity, Spotify OAuth delegation, phone media control relay, and subscription management.

The communication path is UI to WebSocket to `nocturned` to Bluetooth to the companion app and finally to the Spotify API.

## Technical Challenges

Direct Bluetooth communication between the Car Thing and mobile devices was the project's most significant systems challenge. The solution combined BlueZ-based device management in the Rust daemon with automatic reconnection using exponential backoff and bidirectional media control relay between the embedded device and paired phones.

Shipping firmware updates safely required a robust over-the-air system. Nocturne uses SWUpdate with cryptographic signature verification and dual-partition A/B failover, allowing devices to recover from failed updates without becoming unusable.

Wake-word detection had to operate within the device's 512MB memory constraint, so the team integrated ONNX runtime inference models optimized for the ARM Cortex-A53. More broadly, the fixed SoC, small touch display, and limited memory required careful optimization across the firmware, daemon, and interface.

Each major version also reduced setup friction. The project moved from a required Raspberry Pi, to Bluetooth tethering, and then to direct Bluetooth communication through companion apps. That progression simplified the user experience while increasing the amount of systems engineering inside the device itself.

## Technology Stack

The firmware stack uses Buildroot, Linux kernel 4.9.113, Weston, BlueZ, and SWUpdate. Systems components use Rust, WebSockets, Supervisord, and ONNX inference. The frontend uses React 19, Vite, TailwindCSS, and Chromium kiosk mode. Companion software targets iOS and Android, while the hardware target is the ARM Cortex-A53 and Amlogic S905D2 platform.

Earlier releases used Debian 12 with a Raspberry Pi network bridge, followed by NixOS with Bluetooth tethering through a phone hotspot. Git and GitHub support the project's open-source development workflow.

## Project Status

Nocturne remains under active development. The project maintains an open-source community of more than 1,700 members and more than 700 sponsors, with companion apps available through Google Play and iOS TestFlight.

The project is open source and available on [GitHub](https://github.com/usenocturne).
